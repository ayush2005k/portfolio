import os
import sys
import subprocess

def create_video():
    width = 1280
    height = 720
    fps = 30
    duration = 18  # 18 seconds loop
    total_frames = fps * duration

    # Launch ffmpeg process
    output_path = "public/videos/scout-ai-pro.mp4"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    cmd = [
        "ffmpeg", "-y",
        "-f", "image2pipe",
        "-vcodec", "ppm",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "veryfast",
        "-crf", "22",
        output_path
    ]

    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    # Pre-render background frame
    # 0 = Haaland (0-5s), 1 = De Bruyne (5-9s), 2 = Jack Harrison (9-13s), 3 = Konate (13-18s)
    players = [
        {
            "name": "Erling Haaland", "team": "Man City", "role": "FWD", "price": "£14.5m", "form": "9.2",
            "pts": "12.2", "conf": 69, "lr": 7.8, "rf": 12.1, "xgb": 13.1,
            "badge": "ESSENTIAL CAPTAIN", "total_pts": 185, "goals": 22, "assists": 3, "ict": 15.2,
            "filter": "MAN CITY"
        },
        {
            "name": "Kevin De Bruyne", "team": "Man City", "role": "MID", "price": "£10.5m", "form": "7.2",
            "pts": "9.5", "conf": 63, "lr": 5.9, "rf": 10.0, "xgb": 10.3,
            "badge": "STRONG HOLD", "total_pts": 85, "goals": 4, "assists": 12, "ict": 11.5,
            "filter": "MAN CITY"
        },
        {
            "name": "Jack Harrison", "team": "Everton", "role": "MID", "price": "£5.5m", "form": "6.0",
            "pts": "6.3", "conf": 71, "lr": 4.3, "rf": 6.8, "xgb": 6.8,
            "badge": "MONITOR", "total_pts": 82, "goals": 3, "assists": 3, "ict": 7.2,
            "filter": "EVERTON"
        },
        {
            "name": "Ibrahima Konate", "team": "Liverpool", "role": "DEF", "price": "£5.4m", "form": "6.0",
            "pts": "6.1", "conf": 66, "lr": 4.0, "rf": 7.2, "xgb": 5.9,
            "badge": "STARTING ELEVEN", "total_pts": 88, "goals": 1, "assists": 0, "ict": 4.8,
            "filter": "LIVERPOOL"
        }
    ]

    header = f"P6\n{width} {height}\n255\n".encode("ascii")

    for f in range(total_frames):
        t = f / fps
        if t < 5.0:
            idx = 0
            cur_x = int(140 + min(1.0, t / 4.0) * 20)
            cur_y = int(220 + min(1.0, t / 4.0) * 120)
        elif t < 9.0:
            idx = 1
            cur_x = int(160 + min(1.0, (t - 5.0) / 3.0) * 100)
            cur_y = int(340 - min(1.0, (t - 5.0) / 3.0) * 200)
        elif t < 13.0:
            idx = 2
            cur_x = int(260 + min(1.0, (t - 9.0) / 3.0) * 80)
            cur_y = int(140 + min(1.0, (t - 9.0) / 3.0) * 160)
        else:
            idx = 3
            cur_x = int(340 - min(1.0, (t - 13.0) / 4.0) * 150)
            cur_y = int(300 + min(1.0, (t - 13.0) / 4.0) * 200)

        pdata = players[idx]

        # Create frame buffer (light background #f8fafc -> 248, 250, 252)
        buf = bytearray([248, 250, 252] * (width * height))

        def draw_rect(x1, y1, x2, y2, r, g, b):
            x1 = max(0, min(width - 1, x1))
            x2 = max(0, min(width - 1, x2))
            y1 = max(0, min(height - 1, y1))
            y2 = max(0, min(height - 1, y2))
            color_bytes = bytes([r, g, b]) * (x2 - x1 + 1)
            for y in range(y1, y2 + 1):
                start = (y * width + x1) * 3
                end = start + len(color_bytes)
                buf[start:end] = color_bytes

        # Top Bar: White
        draw_rect(0, 0, width - 1, 55, 255, 255, 255)
        # Top Bar border
        draw_rect(0, 55, width - 1, 56, 226, 232, 240)
        # Top Logo pill
        draw_rect(20, 14, 180, 42, 99, 102, 241)
        # Top Search Bar
        draw_rect(420, 12, 860, 44, 241, 245, 249)
        # Top Active Badge
        draw_rect(1060, 14, 1240, 42, 16, 185, 129)

        # Left Sidebar: Players List
        draw_rect(20, 75, 340, height - 30, 255, 255, 255)
        # Filter pills row
        c_all = (99, 102, 241) if pdata["filter"] == "ALL TEAMS" else (241, 245, 249)
        c_mci = (99, 102, 241) if pdata["filter"] == "MAN CITY" else (241, 245, 249)
        c_eve = (99, 102, 241) if pdata["filter"] == "EVERTON" else (241, 245, 249)
        c_liv = (99, 102, 241) if pdata["filter"] == "LIVERPOOL" else (241, 245, 249)
        draw_rect(35, 120, 95, 142, *c_all)
        draw_rect(105, 120, 175, 142, *c_mci)
        draw_rect(185, 120, 255, 142, *c_eve)
        draw_rect(265, 120, 330, 142, *c_liv)

        # Player List Cards
        for row in range(5):
            py = 160 + row * 95
            is_active = (row == 0 and idx == 0) or (row == 2 and idx == 1) or (row == 3 and idx == 2) or (row == 1 and idx == 3)
            bg = (240, 245, 255) if is_active else (255, 255, 255)
            draw_rect(30, py, 330, py + 85, *bg)
            border_c = (99, 102, 241) if is_active else (226, 232, 240)
            draw_rect(30, py, 330, py + 1, *border_c)
            draw_rect(30, py + 84, 330, py + 85, *border_c)
            # Avatar circle mockup
            draw_rect(42, py + 18, 80, py + 56, 129, 140, 248)
            # Name mockup line
            draw_rect(90, py + 22, 220, py + 34, 15, 23, 42)
            # Subtitle mockup line
            draw_rect(90, py + 42, 180, py + 52, 148, 163, 184)
            # Form pill
            draw_rect(260, py + 26, 315, py + 50, 220, 252, 231)

        # Main Content Area
        # Player Banner Card
        draw_rect(360, 75, 1240, 160, 255, 255, 255)
        # Player Avatar Big
        draw_rect(385, 90, 435, 140, 99, 102, 241)
        # Player Name Big
        draw_rect(450, 95, 700, 115, 15, 23, 42)
        # Player Details
        draw_rect(450, 125, 620, 138, 100, 116, 139)
        # Status Pill
        draw_rect(1060, 95, 1220, 135, 16, 185, 129)

        # Center Column: Ensemble Forecast
        draw_rect(360, 180, 780, 420, 255, 255, 255)
        # Predicted points big number
        draw_rect(385, 230, 480, 275, 99, 102, 241)
        # Confidence Bar
        conf_w = int(250 * (pdata["conf"] / 100.0))
        draw_rect(500, 250, 500 + conf_w, 265, 16, 185, 129)
        draw_rect(500 + conf_w, 250, 750, 265, 226, 232, 240)

        # Models consensus bars
        lr_w = int(200 * (pdata["lr"] / 15.0))
        rf_w = int(200 * (pdata["rf"] / 15.0))
        xgb_w = int(200 * (pdata["xgb"] / 15.0))
        draw_rect(520, 315, 520 + lr_w, 325, 96, 165, 250)
        draw_rect(520, 345, 520 + rf_w, 355, 52, 211, 153)
        draw_rect(520, 375, 520 + xgb_w, 385, 168, 85, 247)

        # Right Column: Prediction Intelligence & XAI
        draw_rect(800, 180, 1240, 420, 255, 255, 255)
        # 3 check bullets
        for b in range(3):
            by = 220 + b * 32
            draw_rect(825, by, 835, by + 10, 16, 185, 129)
            draw_rect(845, by + 2, 1180, by + 8, 51, 65, 85)
        # Scouting summary box
        draw_rect(820, 325, 1220, 400, 248, 250, 252)
        draw_rect(835, 345, 1200, 355, 15, 23, 42)
        draw_rect(835, 365, 1140, 373, 100, 116, 139)

        # Bottom Left: Feature Importance (SHAP Analysis)
        draw_rect(360, 440, 780, 680, 255, 255, 255)
        # SHAP Horizontal Bars
        shap_widths = [260, 180, 130, 90]
        for sb in range(4):
            sy = 510 + sb * 38
            draw_rect(385, sy, 460, sy + 10, 100, 116, 139)
            draw_rect(480, sy - 2, 480 + shap_widths[sb], sy + 14, 129, 140, 248)

        # Bottom Right: Overall Player Stats
        draw_rect(800, 440, 1240, 680, 255, 255, 255)
        # 4 Stat Cards
        stats_data = [
            (820, 500, 1000, 580, 99, 102, 241),
            (1020, 500, 1220, 580, 16, 185, 129),
            (820, 595, 1000, 665, 245, 158, 11),
            (1020, 595, 1220, 665, 236, 72, 153),
        ]
        for sx1, sy1, sx2, sy2, sr, sg, sb in stats_data:
            draw_rect(sx1, sy1, sx2, sy2, 248, 250, 252)
            draw_rect(sx1 + 15, sy1 + 15, sx1 + 75, sy1 + 45, sr, sg, sb)

        # Animated Mouse Cursor
        for cy in range(16):
            draw_rect(cur_x, cur_y + cy, cur_x + max(1, 16 - cy), cur_y + cy, 15, 23, 42)
        # Cursor shadow
        draw_rect(cur_x + 2, cur_y + 2, cur_x + 5, cur_y + 5, 255, 255, 255)

        # Send frame to ffmpeg
        p.stdin.write(header)
        p.stdin.write(buf)

    p.stdin.close()
    p.wait()
    print("Video generation finished:", output_path)

if __name__ == "__main__":
    create_video()
