<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>スクレイピング付きWebページ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .header, .footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1em 0;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 2em 0;
        }
        .content {
            background-color: white;
            padding: 2em;
            margin-bottom: 2em;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        a {
            color: #0066cc;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ウェブスクレイピングデモ</h1>
    </div>
    <div class="container">
        <div class="content">
            <h2>スクレイピング結果</h2>
            <?php
                $url = "https://www.example.com"; // スクレイピングするURL
                $html = file_get_contents($url);
                // ここで$htmlを解析し、必要なデータを抽出します
                echo "<p>スクレイピングした内容をここに表示します。</p>";
            ?>
        </div>
    </div>
    <div class="footer">
        <p>&copy; 2023 スクレイピングデモ</p>
    </div>
</body>
</html>
