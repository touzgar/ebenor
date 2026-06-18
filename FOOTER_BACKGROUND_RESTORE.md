# 🔄 RESTORE FOOTER BACKGROUND IMAGE

Your original footer background image has been backed up and can be restored easily.

## 📷 Original Footer Background Image

**Default Image URL:**
```
https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90
```

This is a beautiful woodworking workshop image from Unsplash.

---

## 🚀 METHOD 1: Using Admin Panel (Recommended)

1. Go to **http://localhost:3000/admin/homepage/accueil**
2. Click on the **📄 Footer** tab
3. Scroll down to **🖼️ Image de Fond du Footer** section
4. Copy this URL:
   ```
   https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90
   ```
5. You have two options:
   - **Option A:** Upload your saved image file if you have it
   - **Option B:** Delete the current image and let it use the default

---

## 🛠️ METHOD 2: Using Browser Console (Fastest)

1. Open your website: **http://localhost:3000**
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Copy and paste this code:

```javascript
// Restore default footer background
let footerContent = JSON.parse(localStorage.getItem('footer_content') || '{}');
footerContent.backgroundImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90';
localStorage.setItem('footer_content', JSON.stringify(footerContent));
window.dispatchEvent(new Event('footer_content_updated'));
console.log('✅ Footer background restored!');
location.reload();
```

5. Press **Enter**
6. The page will refresh automatically with the original background

---

## 📜 METHOD 3: Using Node.js Script

Run this command in your terminal (from the `frontend` folder):

```bash
node reset-footer-background.js
```

Then refresh your browser.

---

## ✅ Verification

After restoration, you should see:
- The original woodworking workshop background on the footer
- The image URL in admin panel showing the Unsplash link
- All footer text and content unchanged

---

## 💾 Save the Image for Future

To save the original image to your PC:

1. Right-click on this link: [Original Footer Background](https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90)
2. Select **Save image as...**
3. Save it as: `footer-background-original.jpg`

Now you'll always have a backup! 🎉

---

## 🆘 Need Help?

If you need to restore other sections:
- **Hero Background:** See `BUTTON_LINKS_FIX.md`
- **CTA Background:** Check admin panel CTA section
- **Factory Background:** Check admin panel Factory section

All original default images are preserved in the code!
