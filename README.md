# הטובים על גלגלים - דף נחיתה

דף נחיתה למפגשי הקיץ של ילדי המעשים הטובים. React + Vite + Tailwind, פרוס ב-GitHub Pages.

## פיתוח מקומי

```bash
npm install
npm run dev
```

## עדכון תוכנית שבועית

כל שבוע, כשמתקבלת התוכנית לשבוע הקרוב, יש לעדכן את הרשומה המתאימה ב-`src/data/campData.js` (מערך `SESSIONS`): להוסיף `title`, `description`, `highlights` ולסמן `published: true`.

## הגדרת שליחת מייל (EmailJS)

טופס ההרשמה שולח את הפרטים למייל דרך [EmailJS](https://www.emailjs.com):

1. הרשמה בחינם ב-emailjs.com וחיבור שירות מייל (Gmail וכו')
2. יצירת תבנית (Template) עם השדות: `child_name`, `grade`, `phone`, `notes`, `session_date`, ויעד השליחה קבוע ל-malkytene@gmail.com
3. יצירת קובץ `.env` (ראה `.env.example`) עם:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. להוסיף את אותם שלושת הערכים כ-**Repository Secrets** ב-GitHub (Settings → Secrets and variables → Actions), כדי שה-build האוטומטי ידע לשלוח מייל גם באתר החי

## פריסה (Deploy)

הפריסה אוטומטית: כל push ל-`main` מריץ build ומעלה ל-GitHub Pages דרך `.github/workflows/deploy.yml`.

יש לוודא ש-GitHub Pages מוגדר ב-Settings → Pages → Source: "GitHub Actions".
