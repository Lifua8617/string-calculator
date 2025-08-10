<template>
  <div class="making-string-calculator">
    <h1>製糸時間計算ツール</h1>
    <div class="calculator-form">
      <div class="form-group">
        <label for="rpm">回転数:</label>
        <input type="number" id="rpm" v-model.number="rpm" placeholder="例: 7000" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="count">番手 (分数可):</label>
        <input type="text" id="count" v-model.trim="countInput" placeholder="例: 48 または 1/48" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="twist">撚り:</label>
        <input type="number" id="twist" v-model.number="twist" placeholder="例: 570" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="hundredValue">ボビン1本あたりに巻く重量:</label>
        <input type="number" id="hundredValue" v-model.number="hundredValue" placeholder="例: 100" autocomplete="off">
      </div>
    </div>

    <div v-if="isValidInput" class="results">
      <h2>計算結果</h2>
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
                <span style="padding: 0 10px;">
                  <span v-if="countIsFraction" style="display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center;">
                    <span style="padding: 0 10px; border-bottom: 1px solid #000000;">{{ countNumerator }}</span>
                    <span style="padding: 0 10px;">{{ countDenominator }}</span>
                  </span>
                  <span v-else>{{ countInput }}</span>
                  &times; {{ twist }} </span>
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
      <hr>
      <p class="final-answer">最終的に求められる時間(分): <strong>{{ result3 }}</strong></p>
    </div>
    <div v-else class="prompt">
      <p>回転数、番手、撚りを正しく入力してください。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MakingString',
  data() {
    return {
      rpm: null,
      countInput: '', // Start with empty or a default
      twist: null,
      hundredValue: 100,
    };
  },
  computed: {
    parsedCount() {
      const input = this.countInput;
      if (!input) return 0;
      if (typeof input === 'number') return input;
      if (typeof input === 'string') {
        if (input.includes('/')) {
          const parts = input.split('/');
          if (parts.length === 2) {
            const numerator = parseFloat(parts[0]);
            const denominator = parseFloat(parts[1]);
            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
              return numerator / denominator;
            }
          }
        } else {
          const val = parseFloat(input);
          if (!isNaN(val)) return val;
        }
      }
      return 0; // Invalid format
    },
    isValidInput() {
      return this.rpm > 0 && this.parsedCount > 0 && this.twist > 0 && this.hundredValue > 0;
    },
    result1() {
      if (!this.isValidInput) return 0;
      const val = (this.rpm / (this.parsedCount * this.twist)) * 60;
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
    countIsFraction() {
      if (!this.countInput || typeof this.countInput !== 'string') return false;
      const parts = this.countInput.split('/');
      return parts.length === 2 && !isNaN(parseFloat(parts[0])) && !isNaN(parseFloat(parts[1])) && parseFloat(parts[1]) !== 0;
    },
    countNumerator() {
      if (this.countIsFraction) {
        return this.countInput.split('/')[0];
      }
      return this.countInput;
    },
    countDenominator() {
      if (this.countIsFraction) {
        return this.countInput.split('/')[1];
      }
      return null;
    },
  },
};
</script>

<style scoped>
.making-string-calculator {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
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
}
.final-answer strong {
  font-size: 1.5rem;
}
.prompt {
  margin-top: 2rem;
  text-align: center;
  color: #777;
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