// ضع الرابط الذي نسخته من Google Apps Script هنا
const GOOGLE_SCRIPT_URL = "ضع_الرابط_الذي_نسخته_هنا";

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.btn-fancy');
    submitBtn.innerText = "جاري إرسال التسجيل...";
    submitBtn.disabled = true;

    // جلب البيانات
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const educationLevel = document.getElementById('educationLevel').value;

    const selectedCourses = [];
    document.querySelectorAll('input[name="courses"]:checked').forEach((checkbox) => {
        selectedCourses.push(checkbox.value);
    });

    if (selectedCourses.length === 0) {
        alert('الرجاء اختيار دورة واحدة على الأقل!');
        submitBtn.innerText = "تأكيد التسجيل الآن";
        submitBtn.disabled = false;
        return;
    }

    const payload = {
        fullName: `${firstname} ${lastname}`,
        phone: phone,
        email: email,
        level: educationLevel,
        courses: selectedCourses.join(', '),
        date: new Date().toLocaleDateString('ar-EG')
    };

    // إرسال البيانات إلى Google Sheets سرّاً
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(() => {
        // عرض بطاقة التكأكيد للطالب
        document.getElementById('resFullName').textContent = payload.fullName;
        document.getElementById('resPhone').textContent = payload.phone;
        document.getElementById('resEmail').textContent = payload.email;
        document.getElementById('resEducation').textContent = payload.level;

        const coursesList = document.getElementById('resCourses');
        coursesList.innerHTML = '';
        selectedCourses.forEach((course) => {
            const li = document.createElement('li');
            li.textContent = course;
            coursesList.appendChild(li);
        });

        document.getElementById('resDate').textContent = payload.date;

        // إخفاء الاستمارة وإظهار البطاقة
        document.getElementById('registrationForm').classList.add('hidden');
        document.getElementById('receiptCard').classList.remove('hidden');
    }).catch(error => {
        alert('حدث خطأ أثناء الإرسال، حاول مرة أخرى.');
        submitBtn.innerText = "تأكيد التسجيل الآن";
        submitBtn.disabled = false;
    });
});

function resetForm() {
    document.getElementById('registrationForm').reset();
    document.getElementById('registrationForm').classList.remove('hidden');
    document.getElementById('receiptCard').classList.add('hidden');
    
    const submitBtn = document.querySelector('.btn-fancy');
    submitBtn.innerText = "تأكيد التسجيل الآن";
    submitBtn.disabled = false;
}