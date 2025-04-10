<script setup>
import { ref, computed } from 'vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarBody from './CalendarBody.vue'
import MonthlyBody from './MonthlyBody.vue'
import DailyPaymentModal from '@/components/main/daily/DailyPaymentModal.vue'
import { usePaymentStore } from '@/stores/paymentAddStore'

const props = defineProps({
  selectedDate: {
    type: Date,
    required: true,
  },
})

const emit = defineEmits(['update:selectedDate', 'update:viewDate'])

const mode = ref('calendar')
const isModalOpen = ref(false)
const selectedDateForModal = ref('')

const paymentStore = usePaymentStore()

// ⬇ computed로 변환
const filteredItems = computed(() =>
  paymentStore.paymentList.filter((item) => item.date === selectedDateForModal.value),
)

const handleOpenModal = (dateStr) => {
  selectedDateForModal.value = dateStr
  isModalOpen.value = true
}
</script>

<template>
  <div class="calendar-view">
    <CalendarHeader :currentMode="mode" @updateMode="mode = $event" />

    <div v-if="mode === 'calendar'" class="calendar-content">
      <CalendarBody
        :selectedDate="selectedDate"
        @update:selectedDate="(val) => emit('update:selectedDate', val)"
        @update:viewDate="(val) => emit('update:viewDate', val)"
        @open-modal="handleOpenModal"
      />
    </div>

    <DailyPaymentModal
      :isOpen="isModalOpen"
      :date="selectedDateForModal"
      :items="filteredItems || []"
      @close="isModalOpen = false"
    />

    <MonthlyBody v-if="mode === 'monthly'" />
  </div>
</template>

<style scoped>
.calendar-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.calendar-content {
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
