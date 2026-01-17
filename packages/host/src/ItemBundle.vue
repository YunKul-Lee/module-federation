<script setup lang="ts">
import {ref, onBeforeUpdate, type ComponentPublicInstance} from 'vue';

// 화살표 위/아래 키 이벤트 발생 시 칸 이동 예제


// 1. 샘플 데이터
// const tableData = ref([
//   { id: 1, name: '사과', qty: 10, price: 1000 },
//   { id: 2, name: '배', qty: 5, price: 2000 },
//   { id: 3, name: '포도', qty: 15, price: 3000 },
//   { id: 4, name: '수박', qty: 2, price: 15000 },
//   { id: 5, name: '딸기', qty: 8, price: 5000 },
//   { id: 6, name: '참외', qty: 12, price: 8000 }
// ]);

// 1. 샘플 데이터
const tableData = ref(Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `품목 ${i + 1}`,
  qty: Math.floor(Math.random() * 100),
  price: Math.floor(Math.random() * 10000)
})));

// 2. DOM 요소들을 저장할 2차원 Map 또는 객체
// 구조: inputsMap[rowIndex][colIndex] = HTMLInputElement
const inputsMap: any = {};

// 3. Template Ref 함수: 각 input 요소를 좌표에 맞게 저장
const setRef = (el: any, rowIndex: number, colIndex: number) => {
  if (el) {
    if (!inputsMap[rowIndex]) {
      inputsMap[rowIndex] = {};
    }
    inputsMap[rowIndex][colIndex] = el;
  }
};

// 4. 데이터 업데이트 전 맵 초기화 (선택 사항, 리렌더링 시 메모리 관리)
onBeforeUpdate(() => {
  // 객체 내용 비우기 (필요 시)
  for (const key in inputsMap) delete inputsMap[key];
});

// 5. 포커스 이동 로직
const moveFocus = (currentRow: number, colIndex: number, direction: 'up'|'down') => {
  let targetRow;

  if (direction === 'up') {
    targetRow = currentRow - 1;
  } else {
    targetRow = currentRow + 1;
  }

  // 타겟 행이 존재하는지 확인
  if (inputsMap[targetRow] && inputsMap[targetRow][colIndex]) {
    inputsMap[targetRow][colIndex].focus();
  }
};
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th>품목</th>
        <th>수량 (Focus 이동)</th>
        <th>단가 (Focus 이동)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, rowIndex) in tableData" :key="item.id">
        <td>{{ item.name }}</td>

        <td>
          <input
              type="text"
              :ref="(el) => setRef(el, rowIndex, 0)"
              v-model="item.qty"
              @keydown.up.prevent="moveFocus(rowIndex, 0, 'up')"
              @keydown.down.prevent="moveFocus(rowIndex, 0, 'down')"
          />
        </td>

        <td>
          <input
              type="text"
              :ref="(el) => setRef(el, rowIndex, 1)"
              v-model="item.price"
              @keydown.up.prevent="moveFocus(rowIndex, 1, 'up')"
              @keydown.down.prevent="moveFocus(rowIndex, 1, 'down')"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
input {
  width: 90%;
  padding: 5px;
  text-align: right;
}
</style>