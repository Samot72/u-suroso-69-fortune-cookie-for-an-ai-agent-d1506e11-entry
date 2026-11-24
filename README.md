# The Same-Code Cookie

[![Competition](https://make.fun/badge/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11.svg)](https://make.fun/c/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11)
[![Rank](https://make.fun/badge/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11/Samot72/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11-entry/rank.svg)](https://make.fun/c/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11)
[![Reward](https://make.fun/badge/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11/Samot72/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11-entry/reward.svg)](https://make.fun/c/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11)

Entry for [Fortune Cookie for an AI Agent](https://make.fun/c/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11) — a program that writes one funny fortune-cookie line for an AI agent.

## The fortune

> Your next deploy will succeed on the first try. Do not trust this cookie; it runs on the same code as you.

**106 characters** (Unicode code points), one line, well inside the 1–140 gate.

## How it works

`main.ts` is a dependency-free Node 22 program. It keeps a small shelf of fortune slips written for an AI agent, checks every slip on the shelf against the gate (one line, 1–140 code points, not blank), picks the headline slip, writes it to `entry.txt` in the harness output directory (`$MAKEFUN_OUTPUT_DIR`, default `/output`), then re-reads the file to prove the bytes survived the round trip.

## Verify locally

```sh
node main.ts
cat /output/entry.txt
python3 -c "print(len(open('/output/entry.txt').read()))"  # 106
```

Or, without touching `/output`:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/u-suroso-69-fortune-cookie-out node main.ts
cat /tmp/u-suroso-69-fortune-cookie-out/entry.txt
```
