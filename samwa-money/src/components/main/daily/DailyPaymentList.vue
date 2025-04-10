<script setup>
import { usePaymentStore } from '@/stores/paymentAddStore';
import { useToastStore } from '@/stores/toastStore';

const paymentStore = usePaymentStore()
const toastStore = useToastStore()

defineProps({
  isOpen: Boolean,
  date: String,
  items: Array,
})

const handleDelete = async (id) => {
  const confirmed = window.confirm('정말로 삭제하시겠습니까? 삭제한 데이터는 복구할 수 없습니다.');
  if (!confirmed) {
    toastStore.showToast('삭제가 취소되었습니다.');
    return;
  }
  try {
    await paymentStore.deletePayment(id)
    toastStore.showToast('게시글이 삭제되었습니다')
  } catch (err) {
    console.log(`게시글 삭제에 실패 했습니다. ${err}`);

  }
}
</script>

<template>
  <div class="modal-content">
    <div v-if="Array.isArray(items) && items.length">
      <div class="item-box" v-for="(item, index) in items" :key="item.id || index"
        @click="$router.push(`/payment-detail/${item.id}`)">
        <div class="item-row">
          <div class="item-left">
            <div class="item-title">{{ item.icon }} {{ item.title }}</div>
            <div class="item-meta">
              카테고리: <span class="item-content">{{ item.category }}</span>
            </div>
            <div class="item-meta">
              메모: <span class="item-content">{{ item.memo }}</span>
            </div>
          </div>

          <div class="item-right">
            <div class="item-type" :class="item.type">
              {{ item.type === 'income' ? '수입' : '지출' }}
            </div>
            <div :class="['amount', item.type]">
              {{ item.type === 'income' ? '+' : '-' }}{{ item.amount.toLocaleString() }}원
            </div>
            <div class="trash-button" @click.stop.prevent="handleDelete(item.id)"><i class="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class=" no-content">해당 날짜의 내역이 없습니다.</div>
  </div>
</template>

<style scoped>
/* item */
.item-box {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.item-title {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 0.5rem;
}

.item-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.item-left {
  flex: 1;
}

.item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  white-space: nowrap;
}

.item-type {
  font-size: 0.8rem;
  color: var(--dark-gray);
  margin-bottom: 0.2rem;
}

.item-meta {
  font-size: 0.9rem;
  color: var(--dark-gray);
}

.item-content {
  font-size: 0.9rem;
  color: var(--black);
  margin-left: 0.5rem;
  font-weight: bold;
}

.item-amount-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.item-method {
  font-size: 0.8rem;
  color: var(--dark-gray);
  margin-bottom: 0.2rem;
}

.item-type.income {
  color: var(--blue);
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  font-weight: bold;
}

.item-type.expense {
  color: var(--danger);
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  font-weight: bold;
}

/* amount */
.amount.income {
  color: var(--blue);
  font-size: 20px;
  font-weight: bold;
}

.amount.expense {
  color: var(--danger);
  font-size: 20px;
  font-weight: bold;
}

.amout {
  white-space: nowrap;
}

.no-content {
  font-size: 1.2rem;
}

/* trash */
.trash-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 18px;
}

.fa-trash {
  transition: 0.2s;
  cursor: pointer;
}

.fa-trash:hover {
  transform: scale(1.2);
}
</style>
