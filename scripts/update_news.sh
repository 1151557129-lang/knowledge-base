#!/bin/bash
# 每日资讯自动更新脚本
# 由 cron 每天早上 8:30 执行

cd ~/knowledge-base
/usr/bin/python3 scripts/fetch_news.py >> ~/knowledge-base/scripts/fetch_news.log 2>&1
