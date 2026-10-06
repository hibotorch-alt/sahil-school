document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. تحديد زر الإرسال وتغيير حالته لمنع التكرار أثناء التحميل
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'جاري التسجيل...';

    // 2. تجميع البيانات من الاستمارة
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        level: document.getElementById('level').value,
        courses: document.getElementById('courses').value,
        date: new Date().toLocaleString('ar-DZ')
    };

    // 3. رابط التطبيق الخاص بك من Google Apps Script
    const scriptURL = 'ضع_رابط_WEB_APP_الخاص_بك_هنا';

    // 4. إرسال الطلب
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        alert('تم التسجيل بنجاح في مدرسة Sahil School!');
        
        // 5. مسح الاستمارة وإعادة تفعيل الزر فوراً لإتاحة تسجيلاً جديداً
        document.getElementById('registrationForm').reset();
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.');
        
        // إعادة تفعيل الزر في حالة حدوث خطأ
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
    });
});
