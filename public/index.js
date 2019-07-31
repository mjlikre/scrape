$(document).ready(function(){
    let articleContainer = $('.article-container'); //#endregion
    $(document).on('click', '.btn.save', handleArticleSave);
    $(document).on('click', '.scrape-new', handleArticleScrape);

    initPage();

    function initPage(){
        articleContainer.empty();
        $.get('/api/headlines?saved=false')
            .then(data=>{
            if(data && data.length){
                renderArticles(data);
            }
            else{
                renderEmpty();
            }
        });

    }

    function renderArticles (articles){
        let articlePanels = [];

        articles.forEach(article => {
            articlePanels.push(createPanel(article));
        });
        articleContainer.append(articlePanels);
    }
    function createPanel  (article){
        let panel =  
            $(`<div class = 'pane] panel-default'> <div class = 'panel-heading'><h3>${article.headline}<a class = btn btn-success save> Save article</a></h3></div><div class = 'panel-body'>${article.summary}</div></div>`)
        panel.data('_id', article._id);
        return panel;
    };


    function renderEmpty  (){
        alert('no new articles')
    }
    function handleArticleSave  (){
        let articlesToSave = $(this).parents('.panel').data();
        articlesToSave.saved = true;
        $.ajax({
            method: "PATCH", 
            url: '/api/headlines',
            data: articlesToSave
        })
        .then(data=>{
            if(data.ok){
                initPage();
            }
        })
    }
    function handleArticleScrape  (){
        $.get('/api/fetch')
            .then(data=>{
                initPage()
                alert(data.message);
            });
        
    }
})

