<script setup lang="ts">
import RatingSelector from '@/components/ui/RatingSelector.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import RatingIndicator from '@/components/ui/RatingIndicator.vue'
import type { Product } from '@/types/product.ts'
import type { Review } from '@/types/review.ts'
import { computed, ref } from 'vue'

const props = defineProps<{
  product: Product
  reviews: Review[]
}>()

const rating = ref<number>(0)
const title = computed(() => {
  if (props.reviews.length === 0) {
    return 'Reviews'
  } else {
    return (
      props.reviews.length +
      ' ' +
      (props.reviews.length > 1 ? 'reviews' : 'review') +
      ' for ' +
      props.product.title
    )
  }
})
const requestString = computed(() => {
  if (props.reviews.length === 0) {
    return `Be the first to review “${props.product.title}”`
  } else {
    return 'Add a review'
  }
})
</script>

<template>
  <div class="tab-reviews">
    <div>
      <h2 class="tab-reviews__title">{{ title }}</h2>
      <p v-if="reviews.length === 0">There are no reviews yet.</p>
      <div v-else>
        <div class="tab-reviews__item row" v-for="review in reviews" :key="review.id">
          <div class="col-auto">
            <ResponsiveImage class="tab-reviews__item-avatar" image-key="avatar" />
          </div>
          <div class="col d-flex flex-column">
            <div class="tab-reviews__item-name">{{ review.name }}</div>
            <div class="tab-reviews__item-date">{{ review.date }}</div>
            <div class="tab-reviews__item-text">{{ review.text }}</div>
          </div>
          <div class="col-auto">
            <RatingIndicator :rating="review.rating" />
          </div>
        </div>
      </div>
    </div>
    <div class="tab-reviews__wrapper">
      <div class="tab-reviews__subtitle">{{ requestString }}</div>
      <div class="tab-reviews__comment-notes">
        Your email address will not be published. Required fields are marked *
      </div>
      <form class="tab-reviews__form">
        <fieldset>
          <p>
            <label class="tab-reviews__form-label form-label" for="product_rating"
              >Your rating *</label
            >
            <RatingSelector class="d-block" v-model="rating" />
            <select
              class="tab-reviews__form-control d-none form-select"
              name="product_rating"
              id="product_rating"
              v-model="rating"
              required
            >
              <option value="0">Rate…</option>
              <option value="5">Perfect</option>
              <option value="4">Good</option>
              <option value="3">Average</option>
              <option value="2">Not that bad</option>
              <option value="1">Very poor</option>
            </select>
          </p>
          <p>
            <label class="tab-reviews__form-label form-label" for="review_comment"
              >Your review *</label
            >
            <textarea
              class="tab-reviews__form-control tab-reviews__form-control--textarea form-control"
              id="review_comment"
              name="review_comment"
              cols="45"
              rows="8"
              required
            ></textarea>
          </p>
          <p>
            <label class="tab-reviews__form-label form-label" for="review_author">Name *</label>
            <input
              class="tab-reviews__form-control form-control"
              id="review_author"
              name="review_author"
              type="text"
              value=""
              size="30"
              required
            />
          </p>
          <p>
            <label class="tab-reviews__form-label form-label" for="author_email">Email *</label>
            <input
              class="tab-reviews__form-control form-control"
              id="author_email"
              name="author_email"
              type="email"
              value=""
              size="30"
              required
            />
          </p>
          <p>
            <input
              class="tab-reviews__form-control"
              id="save_author"
              name="save_author"
              type="checkbox"
              value="yes"
            />
            <label
              class="tab-reviews__form-label tab-reviews__form-label--small form-label"
              for="save_author"
              >Save my name, email, and website in this browser for the next time I comment.</label
            >
          </p>
          <p>
            <button class="tab-reviews__form-submit btn btn-primary" type="button">Submit</button>
          </p>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/bootstrap-api' as *;

.tab-reviews {
  &__title {
    margin-bottom: pxtorem(30px);
  }
  &__item {
    --bs-gutter-x: 24px;
    margin-bottom: pxtorem(35px);
    &-avatar {
      border-radius: 50%;
      width: 56px;
      height: 56px;
    }
    &-name {
      font-size: pxtorem(16px);
      font-weight: 500;
      color: color-token(review-name);
      line-height: 1.7;
    }
    &-date {
      font-size: pxtorem(14px);
      color: color-token(review-date);
      line-height: 1;
      margin-bottom: pxtorem(10px);
    }
    &-text {
      font-size: pxtorem(14px);
      line-height: 1.7;
    }
  }
  &__wrapper {
    padding-top: 2vh;
    padding-bottom: 2vh;
  }
  &__subtitle {
    font-size: pxtorem(20px);
    font-weight: 500;
    margin-bottom: pxtorem(10px);
  }
  &__comment-notes {
    font-size: pxtorem(14px);
    opacity: 0.8;
    line-height: 1.7;
    margin-bottom: pxtorem(25px);
  }
  &__form {
    &-label {
      font-size: pxtorem(14px);
      line-height: 1.7;
      margin-bottom: pxtorem(10px);
      &--small {
        font-size: pxtorem(12px);
        margin-left: pxtorem(8px);
      }
    }
    &-control {
      border-radius: 6px;
      padding: pxtorem(14px 15px);
      font-size: pxtorem(13px);
      line-height: 1.15;
      margin-bottom: pxtorem(20px);
      &--textarea {
        line-height: 1.6;
        resize: none;
      }
    }
    &-submit {
      text-transform: uppercase;
    }
  }
}
</style>
