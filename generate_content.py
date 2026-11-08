#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
توليد 30 منشور LinkedIn + تقويم محتوى — EngineeringPro
الاستخدام: python generate_content.py
الإخراج: linkedin_30d.json + linkedin_30d.csv
"""
import json, csv, datetime

NICHES = {
    "ITR": "قوالب ITR و تقارير التكليف",
    "CABLE": "حاسبة الكابلات و سقوط الجهد",
    "CV": "CV و Cover Letter للمهندسين",
    "LINKEDIN": "تحسين LinkedIn للمهندسين",
    "COMM": "Commissioning و ITR process",
}

TEMPLATES = [
    "💡 نصيحة: {tip}",
    "📊 {stat} — إليك كيف:",
    "🎯 3 أخطاء يرتكبها المهندسون في {topic}:",
    "⚡ {tool} وفر عليّ {time} ساعة هذا الأسبوع.",
    "🚀 من {from_} إلى {to_}: قصتي.",
    "📌 checklist: {topic} في 5 خطوات",
    "❓ هل تعرف {fact}؟",
    "💰 كيف كسبت ${amt} من {product} this month.",
]

TIPS = [
    "استخدم Excel formulas لحساب سقوط الجهد تلقائياً.",
    "ITR جيد = punch list قصير.",
    "LinkedIn headline: 'Engineer | Commissioning | ITR' > 'Looking for opportunities'.",
    "احفظ قوالب CV بصيغة PDF (ATS-friendly).",
    "استخدم Canva لصور LinkedIn (1200×627).",
    "رد على كل تعليق خلال 24 ساعة (algorithm boost).",
    "Batch create: 10 posts في جلسة واحدة.",
    "استخدم hashtags: #engineering #electrical #commissioning (3-5).",
    "Lead magnet: PDF مجاني → email → upsell.",
    "Gumroad: ابدأ بـ 3 منتجات، لا 30.",
]

POSTS = []
start = datetime.date.today()
for i in range(30):
    day = start + datetime.timedelta(days=i)
    niche = list(NICHES.keys())[i % len(NICHES)]
    tip = TIPS[i % len(TIPS)]
    amt = 50 + i*15
    text = f"""{TEMPLATES[i % len(TEMPLATES)].format(
        tip=tip, stat='80% من المهندسين', topic=NICHES[niche],
        tool='حاسبة الكابلات', time=5, from_='0', to_='$500',
        fact='PVC vs XLPE', amt=amt, product=NICHES[niche])}

#{niche.lower()} #engineering #electrical #commissioning #templates

🔗 رابط في التعليقات (Gumroad/Etsy)"""
    POSTS.append({"day": i+1, "date": str(day), "niche": niche, "text": text.strip()})

# write JSON
with open("linkedin_30d.json","w",encoding="utf-8") as f:
    json.dump(POSTS, f, ensure_ascii=False, indent=2)

# write CSV
with open("linkedin_30d.csv","w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f)
    w.writerow(["Day","Date","Niche","Post"])
    for p in POSTS:
        w.writerow([p["day"], p["date"], p["niche"], p["text"]])

print(f"✅ تم توليد {len(POSTS)} منشور.")
print("   → linkedin_30d.json")
print("   → linkedin_30d.csv")
print("\nاستخدم these posts على LinkedIn، 1/يوم، 30 يوماً.")
print("أضف رابط Gumroad في التعليق (algorithm penalizes links in post).")
