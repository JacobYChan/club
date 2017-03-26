const article_categories =
    [
        {
            "categoryid": "1",
            "title": "头条",
            "articles": [
                {
                    "articleid": "01",
                    "title": "文章标题1",
                    "describtion": "描述1",
                    "time": "1490756400",
                    "url": "http://baidu.com",
                    "img": "http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg"
                },
                {
                    "articleid": "02",
                    "title": "文章标题1",
                    "describtion": "描述1",
                    "time": "1490756400",
                    "url": "http://baidu.com",
                    "img": "http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg"
                },
            ]
        },
        {
            "categoryid": "2",
            "title": "跑步经",
            "articles": [
                {
                    "articleid": "01",
                    "title": "文章标题1",
                    "describtion": "描述1",
                    "time": "1490756400",
                    "url": "http://baidu.com",
                    "img": "http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg"
                },
                {
                    "articleid": "02",
                    "title": "文章标题1",
                    "describtion": "描述1",
                    "time": "1490756400",
                    "url": "http://baidu.com",
                    "img": "http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg"
                },
            ]
        },
        {
            "categoryid": "3",
            "title": "减肥茶",
            "articles": [
                {
                    "articleid": "01",
                    "title": "文章标题1",
                    "describtion": "描述1",
                    "time": "1490756400",
                    "url": "http://baidu.com",
                    "img": "http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg"
                },
                {
                    "articleid": "02",
                    "title": "文章标题1",
                    "describtion": "描述1",
                    "time": "1490756400",
                    "url": "http://baidu.com",
                    "img": "http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg"
                },
            ]
        },
    ]
const articleCategory = {
    article_categories
}
articleCategory.getArticleCategory = function (categoryid) {
    if (!categoryid) {
        return;
    } else {
        for (var index in article_categories) {
            if (article_categories[index].categoryid === categoryid) {
                return article_categories[index];
            }
        }
    }
}
// const article = {
//     articleCategory
// }
// article.getArticle = function (articleid) {
//     if (!articleid) {
//         return;
//     } else {
//         for (var index in articleCategory.articles) {
//             if (articleCategory.articles[index].articleid === articleid) {
//                 return articleCategory.articles[index];
//             }
//         }
//     }
// }
export default articleCategory