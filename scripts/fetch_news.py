#!/usr/bin/env python3
"""
资讯新闻抓取脚本
从小米/IT之家/36氪/东方财富等公开源抓取新闻，生成 js/data/news.js
用法: python3 scripts/fetch_news.py
"""

import json
import re
import subprocess
import sys
from datetime import datetime, timezone, timedelta
from html import unescape

# 分类配置
CATEGORIES = [
    {"id": "xiaomi", "title": "小米/智能硬件", "icon": "📱", "color": "#ff6900"},
    {"id": "ai", "title": "AI/IT科技", "icon": "🤖", "color": "#8b5cf6"},
    {"id": "display", "title": "半导体显示", "icon": "🖥️", "color": "#06b6d4"},
    {"id": "stock", "title": "A股", "icon": "📈", "color": "#ef4444"},
]

# 关键词匹配规则
KEYWORD_RULES = {
    "xiaomi": [
        "小米", "Xiaomi", "Redmi", "POCO", "MIUI", "澎湃OS", "小米汽车", "YU7", "SU7",
        "米家", "小米电视", "小米手机", "小米平板", "雷军", "卢伟冰",
        "智能家居", "智能音箱", "智能手表", "智能手环", "TWS耳机",
        "华为穿戴", "OPPO", "vivo", "一加", "realme", "荣耀",
    ],
    "ai": [
        "AI", "人工智能", "GPT", "Claude", "Gemini", "大模型", "LLM",
        "深度学习", "机器学习", "ChatGPT", "OpenAI", "Anthropic", "Google AI",
        "智能体", "Agent", "AIGC", "生成式AI", "Transformer", "NVIDIA", "英伟达",
        "算力", "GPU", "TPU", "数据中心", "云计算", "阿里云", "腾讯云",
        "自动驾驶", "机器人", "无人机", "量子计算",
    ],
    "display": [
        "面板", "显示", "OLED", "LCD", "Mini LED", "Micro LED", "QD-OLED",
        "京东方", "BOE", "TCL华星", "天马", "维信诺", "群创", "友达", "LG Display",
        "三星显示", "SDC", "LGD", "JDI", "夏普",
        "显示器", "电视面板", "车载显示", "IT面板",
        "半导体", "芯片", "封装", "封测", "ASML", "台积电", "TSMC", "中芯国际",
    ],
    "stock": [
        "A股", "沪指", "深指", "创业板", "科创板", "上证", "深证",
        "涨停", "跌停", "北向资金", "融资融券", "IPO", "减持", "增持",
        "央行", "降息", "降准", "LPR", "GDP", "CPI", "PMI",
        "证券", "基金", "债券", "期货", "外汇",
        "财报", "业绩", "营收", "利润", "分红",
    ],
}


def clean_html(html_str):
    """去除HTML标签，保留纯文本"""
    text = re.sub(r'<[^>]+>', '', html_str)
    text = unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def fetch_rss(url, max_items=30):
    """通过 curl + feedparser 解析 RSS"""
    try:
        result = subprocess.run(
            ["curl", "-s", "--max-time", "10", url],
            capture_output=True, text=True, timeout=15
        )
        if result.returncode != 0:
            return []
        import feedparser
        feed = feedparser.parse(result.stdout)
        items = []
        for entry in feed.entries[:max_items]:
            title = entry.get("title", "").strip()
            desc = clean_html(entry.get("summary", entry.get("description", "")))
            link = entry.get("link", "#")
            pub_date = entry.get("published", "")
            # 解析日期
            date_str = datetime.now().strftime("%Y-%m-%d")
            if hasattr(entry, "published_parsed") and entry.published_parsed:
                try:
                    dt = datetime(*entry.published_parsed[:6])
                    date_str = dt.strftime("%Y-%m-%d")
                except:
                    pass
            items.append({
                "title": title,
                "summary": desc[:200] + ("..." if len(desc) > 200 else ""),
                "link": link,
                "date": date_str,
                "source": "RSS",
            })
        return items
    except Exception as e:
        print(f"  ⚠ RSS fetch failed for {url}: {e}")
        return []


def fetch_json(url, max_items=20):
    """通过 curl 获取 JSON API"""
    try:
        result = subprocess.run(
            ["curl", "-s", "--max-time", "10", url],
            capture_output=True, text=True, timeout=15
        )
        if result.returncode != 0:
            return []
        data = json.loads(result.stdout)
        return data
    except Exception as e:
        print(f"  ⚠ JSON fetch failed for {url}: {e}")
        return []


def classify_news(title, summary):
    """根据关键词匹配分类"""
    text = title + " " + summary
    scores = {}
    for cat_id, keywords in KEYWORD_RULES.items():
        score = sum(1 for kw in keywords if kw.lower() in text.lower())
        if score > 0:
            scores[cat_id] = score
    if not scores:
        return None
    return max(scores, key=scores.get)


def fetch_ithome():
    """抓取 IT之家 RSS"""
    print("📡 抓取 IT之家...")
    items = fetch_rss("https://www.ithome.com/rss/", max_items=50)
    for item in items:
        item["source"] = "IT之家"
    print(f"  ✓ 获取 {len(items)} 条")
    return items


def fetch_36kr():
    """抓取 36氪 快讯"""
    print("📡 抓取 36氪...")
    items = fetch_rss("https://36kr.com/feed", max_items=30)
    for item in items:
        item["source"] = "36氪"
    print(f"  ✓ 获取 {len(items)} 条")
    return items


def fetch_sina_tech():
    """抓取新浪科技 RSS"""
    print("📡 抓取 新浪科技...")
    items = fetch_rss("https://feed.mix.sina.com.cn/api/roll/get?pageid=372&lid=2431&k=&num=30&page=1&r=0.1&callback=", max_items=20)
    for item in items:
        item["source"] = "新浪科技"
    print(f"  ✓ 获取 {len(items)} 条")
    return items


def fetch_cls():
    """抓取财联社电报 RSS"""
    print("📡 抓取 财联社...")
    items = fetch_rss("https://rsshub.app/cls/telegraph", max_items=30)
    for item in items:
        item["source"] = "财联社"
    print(f"  ✓ 获取 {len(items)} 条")
    return items


def generate_news_js(all_news):
    """生成 js/data/news.js 文件"""
    today = datetime.now().strftime("%Y-%m-%d")
    news_entries = []
    counter = 1

    for item in all_news:
        news_entries.append({
            "id": f"news-{counter:03d}",
            "category": item["category"],
            "date": item["date"],
            "title": item["title"],
            "summary": item["summary"],
            "source": item["source"],
            "link": item["link"],
        })
        counter += 1

    js_content = """// ============================================
// 资讯新闻 - 四板块数据
// 自动生成于 {timestamp}
// 运行 python3 scripts/fetch_news.py 更新
// ============================================

const NEWS_DATA = {{
  categories: {categories},
  news: {news}
}};
""".format(
        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        categories=json.dumps(CATEGORIES, ensure_ascii=False, indent=4),
        news=json.dumps(news_entries, ensure_ascii=False, indent=4),
    )

    return js_content


def main():
    print("=" * 50)
    print("📰 资讯新闻抓取工具")
    print("=" * 50)

    # 抓取各源
    all_raw = []
    all_raw.extend(fetch_ithome())
    all_raw.extend(fetch_36kr())

    if not all_raw:
        print("\n❌ 未获取到任何新闻，请检查网络连接")
        sys.exit(1)

    print(f"\n📊 共获取 {len(all_raw)} 条原始新闻")

    # 分类
    classified = {"xiaomi": [], "ai": [], "display": [], "stock": []}
    uncategorized = []

    for item in all_raw:
        cat = classify_news(item["title"], item["summary"])
        if cat and len(classified[cat]) < 8:
            item["category"] = cat
            classified[cat].append(item)
        else:
            uncategorized.append(item)

    # 每个分类取前3条
    final_news = []
    for cat_id in ["xiaomi", "ai", "display", "stock"]:
        items = classified[cat_id][:3]
        final_news.extend(items)
        print(f"  {cat_id}: {len(items)} 条")

    if len(final_news) < 8:
        print("\n⚠ 分类新闻不足，补充未分类新闻")
        for item in uncategorized[:8 - len(final_news)]:
            item["category"] = "ai"  # 默认归入AI
            final_news.append(item)

    print(f"\n✅ 最终 {len(final_news)} 条新闻")

    # 生成 JS 文件
    js_content = generate_news_js(final_news)
    output_path = "js/data/news.js"

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"\n📝 已生成 {output_path}")

    # 显示摘要
    print("\n" + "=" * 50)
    for cat in CATEGORIES:
        cat_news = [n for n in final_news if n["category"] == cat["id"]]
        print(f"\n{cat['icon']} {cat['title']} ({len(cat_news)} 条):")
        for n in cat_news[:3]:
            print(f"  • {n['title'][:50]}")

    # 自动提交并推送
    print("\n" + "=" * 50)
    today = datetime.now().strftime("%Y-%m-%d")
    try:
        subprocess.run(["git", "add", "-A"], check=True)
        subprocess.run(
            ["git", "commit", "-m", f"📰 自动更新资讯 {today}"],
            check=True, capture_output=True, text=True
        )
        result = subprocess.run(
            ["git", "push", "origin", "main"],
            check=True, capture_output=True, text=True, timeout=60
        )
        print(f"✅ 已自动提交并推送上线")
    except subprocess.CalledProcessError as e:
        print(f"⚠ Git 操作失败: {e.stderr if e.stderr else e}")
    except Exception as e:
        print(f"⚠ 推送失败: {e}")


if __name__ == "__main__":
    main()
