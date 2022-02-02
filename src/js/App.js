import counter from './utils/counter.js';

const render = (state, {
    submitButton,
    resetButton,
    resultSection,
    caloriesNormSpan,
    caloriesMinSpan,
    caloriesMaxSpan
}) => {

    submitButton.disabled = state.UiState.submitDisabled;
    resetButton.disabled = state.UiState.resetDisabled;

    if(state.UiState.resultSectionHidden == false) { 
        resultSection.classList.remove('counter__result--hidden');
        caloriesNormSpan.textContent = state.resultCallNorm;
        caloriesMinSpan.textContent = state.resultCallMin;
        caloriesMaxSpan.textContent = state.resultCallMax;
        
    } else {
        resultSection.classList.add('counter__result--hidden')  
    } 
}

export default () => {
    const form = document.querySelector('form')
    const submitButton = form.submit;
    const resetButton = form.reset;
    const resultSection = document.querySelector('.counter__result');
    const caloriesNormSpan = document.getElementById('calories-norm');
    const caloriesMinSpan = document.getElementById('calories-minimal');
    const caloriesMaxSpan = document.getElementById('calories-maximal');

    const state = {
        data: {
            gender: 'male',
            age: 0,
            height: 0,
            weight: 0,
            activity: "min",
            resultCallNorm: 0,
            resultCallMin: 0,
            resultCallMax: 0,
        },

        UiState:{
            submitDisabled: true,
            resetDisabled: true,
            resultSectionHidden: true,
        }  
    }

    form.addEventListener('change', (e) => {
        e.preventDefault();
        const activeFormElement = e.target;
        state.data[activeFormElement.name] = activeFormElement.value;

        (state.data.age > 0 || state.data.height > 0 || state.data.weight > 0) ? state.UiState.resetDisabled = false : state.UiState.resetDisabled = true

        if (state.data.age > 0 && state.data.height > 0 && state.data.weight > 0) {
            if (state.data.age < 125 && state.data.height < 270 && state.data.weight < 800) {
                state.UiState.submitDisabled = false;
            } else {
                state.UiState.submitDisabled = true;
            }
        }
        render(state, {
            submitButton,
            resetButton,
            resultSection,
            caloriesNormSpan,
            caloriesMinSpan,
            caloriesMaxSpan
        })
    })

    form.addEventListener('reset',() =>{
        state.data.gender = 'male';
        state.data.age = 0;
        state.data.weight = 0;
        state.data.height = 0;
        state.data.activity = 'min';
        state.data.resultCallNorm = 0;
        state.data.resultCallMin = 0;
        state.data.resultCallMax = 0;
        state.UiState.resetDisabled = true;
        state.UiState.submitDisabled = true;
        state.UiState.resultSectionHidden = true;
        render(state, {
            submitButton,
            resetButton,
            resultSection,
            caloriesNormSpan,
            caloriesMinSpan,
            caloriesMaxSpan
        })
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.UiState.resultSectionHidden = false;
        counter(state);
        render(state, {
            submitButton,
            resetButton,
            resultSection,
            caloriesNormSpan,
            caloriesMinSpan,
            caloriesMaxSpan
        });
    })

    render(state, {
        submitButton,
        resetButton,
        resultSection,
        caloriesNormSpan,
        caloriesMinSpan,
        caloriesMaxSpan
    })
}
