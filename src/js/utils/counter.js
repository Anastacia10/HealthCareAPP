const PhysicalActivityConstant = {
    min: 1.2,
    low: 1.375,
    medium: 1.55,
    high: 1.725,
    max: 1.9,
};
  
const CaloriesFormulaFactor = {
    age: 5,
    weight: 10,
    height: 6.25,
};
  
const CaloriesFormulaConstant = {
    male: -5,
    female: 161
};
  
const CaloriesMinMaxRatio = {
    min: 0.85,
    max: 1.15
};

const counter = (state) =>{
    let callNorm = 0;
    console.log(PhysicalActivityConstant[state.data.activity])
    if(state.data.gender === 'male'){
        callNorm = ((CaloriesFormulaFactor.weight * state.data.weight) + (CaloriesFormulaFactor.height * state.data.height) - (CaloriesFormulaFactor.age * state.data.age) - CaloriesFormulaConstant.male) * PhysicalActivityConstant[state.data.activity]
    }

    else{
        callNorm = ((CaloriesFormulaFactor.weight * state.data.weight) + (CaloriesFormulaFactor.height * state.data.height) - (CaloriesFormulaFactor.age * state.data.age) - CaloriesFormulaConstant.female) * PhysicalActivityConstant[state.data.activity]
    }
    console.log(callNorm);
    state.resultCallNorm = Math.round(callNorm);
    state.resultCallMin = Math.round(callNorm * CaloriesMinMaxRatio.min);
    state.resultCallMax = Math.round(callNorm * CaloriesMinMaxRatio.max);
    return state;
}
export default counter;