<template>
  <div class="making-string-calculator">
    <h2 class="form-title">生産サイクル計算式１</h2>

    <div class="calculator-form">
      <div class="form-group">
        <label for="count">番手:</label>
        <input type="number" id="count" v-model.number="count" placeholder="例: 48" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="twist">撚り:</label>
        <input type="number" id="twist" v-model.number="twist" placeholder="例: 570" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="rpm">回転数:</label>
        <input type="number" id="rpm" v-model.number="rpm" placeholder="例: 7000" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="hundredValue">巻き重量:</label>
        <input type="number" id="hundredValue" v-model.number="hundredValue" placeholder="例: 100" autocomplete="off">
      </div>
    </div>

    <div class="result-container">
      <div v-if="isValidInput" class="final-answer-wrapper">
        <p class="final-answer">生産時間(分): <strong>{{ result3 }}</strong></p>
      </div>
      <div v-else class="prompt">
        <p>回転数、番手、撚りを入力してください。</p>
      </div>
    </div>

    <div v-if="isValidInput" class="results">
      <h2>計算手順</h2>

      <div class="result-item">
        <p>1. 
          <span style="display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center;">
            <span style="padding: 0 10px; border-bottom: 1px solid #000000;">回転数</span>
            <span style="padding: 0 10px;">番手 &times; 撚り</span>
          </span> × 60
        </p>
        <p class="actual-formula"> 
          <code>
            <span style="display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center;">
              <span style="padding: 0 10px; border-bottom: 1px solid #000000;">{{ rpm }}</span>
                <span style="padding: 0 10px;">{{ count }} &times; {{ twist }} </span>
              </span> &times; 60 =
            <strong>{{ result1 }}</strong>
          </code>

        </p>
        
      </div>
      <div class="result-item">
        <p>2. {{ hundredValue }} &divide; (1の答え)</p>
        <p class="actual-formula">
          <code>{{ hundredValue }} &divide; {{ result1 }} =
            <strong>{{ result2 }}</strong>
          </code>
        </p>
        
      </div>
      <div class="result-item">
        <p>3. (2の答え) &times; 60 </p>
        <p class="actual-formula">
          <code>{{ result2 }} &times; 60 =
            <strong>{{ result3 }}</strong>
          </code>
        </p>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MakingString',
  data() {
    return {
      rpm: null,
      count: null,
      twist: null,
      hundredValue: 100,
    };
  },
  computed: {
    isValidInput() {
      return this.rpm > 0 && this.count > 0 && this.twist > 0 && this.hundredValue > 0;
    },
    result1() {
      if (!this.isValidInput) return 0;
      const val = (this.rpm / (this.count * this.twist)) * 60;
      return Math.ceil(val * 10) / 10;
    },
    result2() {
      if (!this.isValidInput || this.result1 === 0) return 0;
      const val = this.hundredValue / this.result1;
      return Math.ceil(val * 10) / 10;
    },
    result3() {
      if (!this.isValidInput) return 0;
      const val = this.result2 * 60;
      return Math.ceil(val * 10) / 10;
    },
  },
};
</script>

<style scoped>
.making-string-calculator {
  max-width: 500px;
  margin: 1rem auto;
  padding: 0.5rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
h2.form-title {
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
}

.result-container {
  min-height: 80px; /* この高さでレイアウトのズレを防ぎます */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.final-answer-wrapper {
  width: 100%;
}

.calculator-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}
input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
input::placeholder {
  color: #aaa;
}
.results {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
}
h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}
.result-item {
  margin-bottom: 1rem;
}
.results p {
  margin: 0.25rem 0;
  font-size: 1.1rem;
  color: #444;
}
.results strong {
  color: #007bff;
}
.formula {
  font-size: 1.2rem;
  color: #666;
  margin-left: 1rem;
  padding: 0.5rem 0;
}
.formula code {
  background-color: #e9e9e9;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}
.fraction {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  text-align: center;
  margin: 0 0.2em;
}
.fraction > sup {
  display: block;
  border-bottom: 1.5px solid currentColor;
  padding: 0 0.2em;
}
.fraction > sub {
  display: block;
  padding: 0 0.2em;
}
hr {
  margin: 1.5rem 0;
  border: 0;
  border-top: 1px solid #ddd;
}
.final-answer {
  font-size: 1.2rem !important;
  font-weight: bold;
  text-align: center;
  background-color: #e6f7ff;
  padding: 1rem;
  border-radius: 4px;
  margin: 0;
}
.final-answer strong {
  font-size: 1.5rem;
}
.prompt {
  text-align: center;
  color: #777;
}
.prompt p {
  margin: 0;
}
.actual-formula {
  font-size: 0.9rem;
  color: #888;
  margin-left: 1rem;
  margin-top: 0.2rem;
}
.actual-formula code {
  background-color: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
}
</style>