document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. جمع البيانات من الاستمارة
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        level: document.getElementById('level').value,
        courses: document.getElementById('courses').value,
        date: new Date().toLocaleString('ar-DZ')
    };

    // 2. رابط Google Apps Script الخاص بك
    const scriptURL = 'ضع_رابط_WEB_APP_الخاص_بك_هنا';

    // 3. إرسال البيانات
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
        document.getElementById('registrationForm').reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.');
    });
});
