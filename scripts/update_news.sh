#!/bin/bash
# 每日资讯自动更新脚本
# 由 cron 每天早上 8:30 执行

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:$PATH"

# macOS keychain 访问
export GIT_TERMINAL_PROMPT=0
security find-internet-password -s github.com -w > /dev/null 2>&1

cd ~/knowledge-base
/usr/bin/python3 scripts/fetch_news.py >> ~/knowledge-base/scripts/fetch_news.log 2>&1
