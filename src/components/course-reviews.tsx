"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Trash2,
  Send,
  MessageSquare,
  User,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewUser {
  id: string;
  name: string | null;
  image: string | null;
}

interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: ReviewUser;
}

interface ReviewsData {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  userReview: Review | null;
}

interface CourseReviewsProps {
  courseId: string;
}

function StarRating({
  rating,
  size = "sm",
  interactive = false,
  onChange,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform duration-100`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                filled
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-600 dark:text-gray-600"
              } transition-colors duration-150`}
            />
          </button>
        );
      })}
    </div>
  );
}

function ReviewCard({
  review,
  isOwn,
  onDelete,
}: {
  review: Review;
  isOwn: boolean;
  onDelete: (id: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const formattedDate = new Date(review.createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(review.id);
    setDeleting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          {review.user.image ? (
            <img
              src={review.user.image}
              alt={review.user.name || "Usuario"}
              className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-emerald-400" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {review.user.name || "Usuario"}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-[11px] text-gray-500">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {isOwn && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="text-gray-500 hover:text-red-400 h-7 w-7 p-0 flex-shrink-0"
          >
            {deleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </Button>
        )}
      </div>

      {review.comment && (
        <p className="mt-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
          {review.comment}
        </p>
      )}
    </motion.div>
  );
}

export function CourseReviews({ courseId }: CourseReviewsProps) {
  const { data: session, status: authStatus } = useSession();
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formRating, setFormRating] = useState(0);
  const [formComment, setFormComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?courseId=${courseId}`);
      if (res.ok) {
        const reviewsData = await res.json();
        setData(reviewsData);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmitReview = async () => {
    if (formRating === 0) {
      setError("Selecciona una calificación");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          rating: formRating,
          comment: formComment.trim() || null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Error al enviar la reseña");
        setSubmitting(false);
        return;
      }

      // Reset form
      setFormRating(0);
      setFormComment("");
      setShowForm(false);
      setError(null);

      // Refresh reviews
      await fetchReviews();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const res = await fetch(`/api/reviews?id=${reviewId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchReviews();
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const isAuthenticated = authStatus === "authenticated";
  const hasUserReview = data?.userReview !== null;
  const canWriteReview = isAuthenticated && !hasUserReview;

  if (loading) {
    return (
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
          <span className="ml-2 text-sm text-gray-500">Cargando reseñas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-emerald-500" />
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Reseñas
          </h3>
        </div>

        {canWriteReview && !showForm && (
          <Button
            onClick={() => setShowForm(true)}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 h-8 text-xs"
          >
            <Star className="w-3.5 h-3.5" />
            Escribir reseña
          </Button>
        )}
      </div>

      {/* Average Rating */}
      {data && data.totalReviews > 0 && (
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/[0.06]">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.averageRating}
            </div>
            <StarRating rating={Math.round(data.averageRating)} size="md" />
            <p className="text-[11px] text-gray-500 mt-1">
              {data.totalReviews} {data.totalReviews === 1 ? "reseña" : "reseñas"}
            </p>
          </div>

          {/* Rating distribution */}
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = data.reviews.filter((r) => r.rating === star).length;
              const percentage = data.totalReviews > 0 ? (count / data.totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 w-3">{star}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 w-5 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-5"
          >
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Tu reseña
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false);
                    setFormRating(0);
                    setFormComment("");
                    setError(null);
                  }}
                  className="h-7 w-7 p-0 text-gray-500 hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Star Rating Selector */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Calificación</p>
                <StarRating
                  rating={formRating}
                  size="lg"
                  interactive
                  onChange={setFormRating}
                />
              </div>

              {/* Comment */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">
                  Comentario (opcional)
                </p>
                <Textarea
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Comparte tu experiencia con este curso..."
                  rows={3}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20 resize-none text-sm"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-red-400 mb-3">{error}</p>
              )}

              {/* Submit */}
              <Button
                onClick={handleSubmitReview}
                disabled={submitting || formRating === 0}
                className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 h-9 text-sm disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Publicar reseña
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {data && data.reviews.length > 0 ? (
          data.reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isOwn={review.userId === session?.user?.id}
              onDelete={handleDeleteReview}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <Star className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Aún no hay reseñas para este curso
            </p>
            {canWriteReview && (
              <p className="text-xs text-emerald-400/70 mt-1">
                ¡Sé el primero en compartir tu opinión!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Login prompt for non-authenticated users */}
      {!isAuthenticated && (
        <div className="mt-4 pt-4 border-t border-white/[0.06] text-center">
          <p className="text-xs text-gray-500">
            <span className="text-emerald-400/70">Inicia sesión</span> para
            escribir una reseña
          </p>
        </div>
      )}

      {/* Already reviewed notice */}
      {isAuthenticated && hasUserReview && data?.userReview && (
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
            <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <p className="text-xs text-emerald-400/80">
              Ya has escrito una reseña para este curso
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
