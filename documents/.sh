# SASS AUTOCOMPILER
sass --watch --no-source-map --style=compressed ./:./

# GIT VIEWER
git log --tags --simplify-by-decoration \
    --pretty=format:"Version: %D%nAuthor: %an%nDate: %ad" \
    --date=short --numstat | \
awk '
    BEGIN {
        FS = "\n"; RS = ""; OFS = "\n"
        # ANSI color codes
        CYAN_BOLD    = "\033[1;36m"
        GREEN_BOLD   = "\033[1;32m"
        YELLOW_BOLD  = "\033[1;33m"
        RESET        = "\033[0m"
    }
    {
        # Split block into lines
        split($0, lines, "\n")

        # Extract and clean fields
        rawver  = gensub(/^Version: */, "", 1, lines[1])
        version = gensub(/.*tag: *([^,)\s]+).*/, "\\1", 1, rawver)
        author  = gensub(/^Author: */, "", 1, lines[2])
        date    = gensub(/^Date: */,   "", 1, lines[3])

        # Initialize counters
        ins = del = 0

        # Accumulate additions/deletions
        for (i = 4; i <= length(lines); i++) {
            if (match(lines[i], /^([0-9]+)[[:space:]]+([0-9]+)/, m)) {
                ins += m[1]
                del += m[2]
            }
        }

        # Compute delta and log-based ratio
        delta = ins - del
        if (ins > 0 && del > 0) {
            ratio = log(ins / del) / log(2)
            rstr = sprintf("%.3f", ratio)
        } else if (ins == 0 && del > 0) {
            ratio = -1
            rstr = "-∞"
        } else if (del == 0 && ins > 0) {
            ratio = 1
            rstr = "∞"
        } else {
            rstr = "0.000"
        }

        # Compute score as ratio * delta
        abs_ratio = (ratio < 0) ? -ratio : ratio
        score = abs_ratio * (ins + del)
        score_str = sprintf("%.0f", score)

        # Print colored block
        printf("%s=============================================================%s\n", CYAN_BOLD, RESET)
        printf("%s%s%s authored by %s%s%s (%s%s%s)\n\n",
            CYAN_BOLD, version, RESET,
            GREEN_BOLD, author, RESET,
            YELLOW_BOLD, date, RESET)
        printf("%sVersion:   %s%s%s\n",  GREEN_BOLD, YELLOW_BOLD, version, RESET)
        printf("%sAuthor:    %s%s%s\n",  GREEN_BOLD, YELLOW_BOLD, author,  RESET)
        printf("%sDate:      %s%s%s\n",  GREEN_BOLD, YELLOW_BOLD, date,    RESET)
        printf("%sAdditions: %s%d%s\n",  GREEN_BOLD, YELLOW_BOLD, ins, RESET)
        printf("%sDeletions: %s%d%s\n",  GREEN_BOLD, YELLOW_BOLD, del, RESET)
        printf("%sDelta:     %s%d%s\n",  GREEN_BOLD, YELLOW_BOLD, delta, RESET)
        printf("%sRatio:     %s%s%s\n",  GREEN_BOLD, YELLOW_BOLD, rstr, RESET)
        printf("%sScore:     %s%s%s\n\n\n", GREEN_BOLD, YELLOW_BOLD, score_str, RESET)
    }
'
