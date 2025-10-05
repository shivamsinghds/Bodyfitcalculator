// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});

// Calorie Calculator Functions
function calculateTDEE() {
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;
    
    if (!age || !weight || !height) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation (weight in kg, height in cm)
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Calculate TDEE
    const tdee = bmr * activityLevel;
    
    // Calculate goal calories
    let goalCalories;
    let deficit;
    
    switch(goal) {
        case 'loss':
            deficit = 500; // 500 calorie deficit for 1 lb/week loss
            goalCalories = Math.round(tdee - deficit);
            break;
        case 'maintenance':
            goalCalories = Math.round(tdee);
            deficit = 0;
            break;
        case 'gain':
            deficit = 300; // 300 calorie surplus for gradual gain
            goalCalories = Math.round(tdee + deficit);
            break;
    }
    
    // Display results
    document.getElementById('tdee-result').textContent = Math.round(tdee);
    document.getElementById('goal-calories').textContent = goalCalories;
    
    // Show appropriate description
    const description = document.getElementById('result-description');
    if (goal === 'loss') {
        description.innerHTML = `
            <p><strong>Weight Loss Plan:</strong> To lose 1 pound per week, aim for a 500-calorie daily deficit.</p>
            <p><strong>Safe Rate:</strong> This creates a sustainable weight loss of 1-2 pounds per week.</p>
            <p><strong>Tips:</strong> Combine this calorie target with regular exercise and a balanced diet for best results.</p>
        `;
    } else if (goal === 'maintenance') {
        description.innerHTML = `
            <p><strong>Maintenance Plan:</strong> This calorie target will help you maintain your current weight.</p>
            <p><strong>Balance:</strong> Focus on nutrient-dense foods and regular physical activity.</p>
            <p><strong>Monitoring:</strong> Track your weight weekly and adjust if needed.</p>
        `;
    } else {
        description.innerHTML = `
            <p><strong>Weight Gain Plan:</strong> This calorie target will help you gain weight gradually and healthily.</p>
            <p><strong>Muscle Focus:</strong> Combine with strength training for lean muscle gain.</p>
            <p><strong>Quality:</strong> Choose nutrient-dense foods to support healthy weight gain.</p>
        `;
    }
    
    document.getElementById('results').style.display = 'block';
}

// Body Fat Calculator Functions
function calculateBodyFat() {
    const gender = document.getElementById('bf-gender').value;
    const weight = parseFloat(document.getElementById('bf-weight').value);
    const height = parseFloat(document.getElementById('bf-height').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const hip = parseFloat(document.getElementById('hip').value);
    const neck = parseFloat(document.getElementById('neck').value);
    
    if (!weight || !height || !waist || !neck || (gender === 'female' && !hip)) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Navy method validation - ensure measurements are within reasonable ranges
    if (waist <= neck) {
        alert('Waist circumference must be greater than neck circumference for accurate calculation.');
        return;
    }
    
    if (gender === 'female' && (waist + hip) <= neck) {
        alert('Sum of waist and hip circumferences must be greater than neck circumference for accurate calculation.');
        return;
    }
    
    // Additional validation for Navy method
    if (height < 100 || height > 250) {
        alert('Please enter a valid height between 100-250 cm.');
        return;
    }
    
    if (waist < 50 || waist > 200) {
        alert('Please enter a valid waist circumference between 50-200 cm.');
        return;
    }
    
    if (neck < 20 || neck > 60) {
        alert('Please enter a valid neck circumference between 20-60 cm.');
        return;
    }
    
    if (gender === 'female' && (hip < 50 || hip > 200)) {
        alert('Please enter a valid hip circumference between 50-200 cm.');
        return;
    }
    
    let bodyFatPercentage;
    
    if (gender === 'male') {
        // Navy method for men: BF% = 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76
        bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
        // Navy method for women: BF% = 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387
        bodyFatPercentage = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }
    
    // Ensure the result is reasonable
    if (bodyFatPercentage < 0) bodyFatPercentage = 0;
    if (bodyFatPercentage > 50) bodyFatPercentage = 50;
    
    const roundedBF = Math.round(bodyFatPercentage * 10) / 10;
    
    // Display results
    document.getElementById('bf-result').textContent = roundedBF;
    
    // Determine category and description
    let category, description, color;
    
    if (gender === 'male') {
        if (roundedBF < 6) {
            category = 'Essential Fat';
            description = 'This is the minimum amount of body fat needed for basic physiological functions.';
            color = '#ff6b6b';
        } else if (roundedBF < 14) {
            category = 'Athletes';
            description = 'Excellent body fat percentage typical of athletes and very fit individuals.';
            color = '#4ecdc4';
        } else if (roundedBF < 18) {
            category = 'Fitness';
            description = 'Good body fat percentage for fitness enthusiasts and active individuals.';
            color = '#45b7d1';
        } else if (roundedBF < 25) {
            category = 'Average';
            description = 'Average body fat percentage for healthy adult males.';
            color = '#96ceb4';
        } else {
            category = 'Above Average';
            description = 'Higher than recommended body fat percentage. Consider lifestyle changes.';
            color = '#feca57';
        }
    } else {
        if (roundedBF < 10) {
            category = 'Essential Fat';
            description = 'This is the minimum amount of body fat needed for basic physiological functions.';
            color = '#ff6b6b';
        } else if (roundedBF < 16) {
            category = 'Athletes';
            description = 'Excellent body fat percentage typical of athletes and very fit individuals.';
            color = '#4ecdc4';
        } else if (roundedBF < 20) {
            category = 'Fitness';
            description = 'Good body fat percentage for fitness enthusiasts and active individuals.';
            color = '#45b7d1';
        } else if (roundedBF < 25) {
            category = 'Average';
            description = 'Average body fat percentage for healthy adult females.';
            color = '#96ceb4';
        } else {
            category = 'Above Average';
            description = 'Higher than recommended body fat percentage. Consider lifestyle changes.';
            color = '#feca57';
        }
    }
    
    document.getElementById('bf-category').textContent = category;
    document.getElementById('bf-category').style.color = color;
    document.getElementById('bf-description').innerHTML = `
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Assessment:</strong> ${description}</p>
        <p><strong>Health Note:</strong> Body fat percentage is just one indicator of health. Consider consulting with a healthcare professional for a comprehensive health assessment.</p>
    `;
    
    document.getElementById('bf-results').style.display = 'block';
}

// Form validation and real-time updates
document.addEventListener('DOMContentLoaded', function() {
    // Calorie calculator form
    const calorieForm = document.getElementById('calorie-form');
    if (calorieForm) {
        calorieForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateTDEE();
        });
        
        // Only calculate when form is submitted, not on every field change
        // Remove real-time calculation to prevent validation errors while filling form
    }
    
    // Body fat calculator form
    const bfForm = document.getElementById('bf-form');
    if (bfForm) {
        bfForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBodyFat();
        });
        
        // Only calculate when form is submitted, not on every field change
        // Remove real-time calculation to prevent validation errors while filling form
        
        // Handle gender change for hip field visibility
        const genderSelect = document.getElementById('bf-gender');
        const hipGroup = document.getElementById('hip-group');
        const hipInput = document.getElementById('hip');
        
        if (genderSelect && hipGroup && hipInput) {
            genderSelect.addEventListener('change', function() {
                if (this.value === 'female') {
                    hipGroup.style.display = 'block';
                    hipInput.required = true;
                } else {
                    hipGroup.style.display = 'none';
                    hipInput.required = false;
                    hipInput.value = '';
                }
            });
            
            // Set initial state
            if (genderSelect.value === 'male') {
                hipGroup.style.display = 'none';
                hipInput.required = false;
            }
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
