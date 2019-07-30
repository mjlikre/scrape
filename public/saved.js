$(document).ready( function(){
    let articleContainer = $('.article-container'); //#endregion



    const initPage = ()=>{
        articleContainer.empty();
        $.get('/api/headlines?saved=true')
            .then(data=>{
                if(data && data.length){
                    renderArticles(data);
                }
                else{
                    renderEmpty();
                }
            });

    }

    const renderArticles = (articles)=>{
        let articlePanels = [];

        articles.forEach(article => {
            articlesPanels.push(createPanel(article));
        });
        articleContainer.append(articlePanels);
    }
    const createPanel = (article)=>{
        let panel =  
            $(`<div class = 'pane] panel-default'> <div class = 'panel-heading'><h3>${article.headline}<a class = btn btn-success save> Save article</a></h3></div><div class = 'panel-body'>${article.summary}</div></div>`)
        panel.data('_id', article._id);
        return panel;
    };


    const renderEmpty = ()=>{
        alert('no new articles')
    }
    const handleArticleDelete = ()=>{
        let articlesToDelete = $(this).parents('.panel').data();
        articlesToSave.saved = true;
        $.ajax({
            method: "Delete", 
            url: '/api/headlines',
            data: articlesToDelete
        })
        .then(data=>{
            if(data.ok){
                initPage();
            }
        })
    }
    const handleArticleNotes = ()=>{
        let currentArticle = $(this).parents('.panel').data();
        $.get('/api/notes/'+ currentArticle._id).then(data=>{
            let modalText = [
                "<div class = 'container-fuid text-center>",
                `<h4> Nores for Article: ${currentArticle._id}</h4> `,
                `<hr/>`,
                `<ul class = 'list-group note-container'></ul>`,
                `<textarea placeholder = "New Note" row = '4' cols = '60'></textarea>`,
                
                `<button class = 'btn btn-success save'> Save Note</button>`,
                `</div>`
            ].join('');
            bootbox.dialog({
                message:modalText,
                closeButton: true
            });

            $(".btn.save").data('article', noteData);

            renderNotesList(noteData);
        });

    }
    const renderNotesList = (data)=>{
        let notesToRender = [];
        let currentNote;
        if(!data.notesToRender.length){
            currentNote = `<li class = 'list-group-item>'>No notes for this one</li>`
            notesToRender.push(currentNote);            

        }else{
            for(var i = 1; i < data.notes.length; i ++){
                currentNote = $([
                    `<li class = 'list-group-item note'>`,
                    data.notes[i].noteText,
                    "<button class = 'btn btn-danger note-delete'>x</button>",
                    '</li>'

                ].join(''));
                currentNote.children('button').data("_id", data.notes[i]._id);
                notesToRender.push(currentNote)
            }
        }
        $('.note-container').append(notesToRender);
    }
    const handleNoteSave = ()=>{
        let noteData;
        let newNote = $('.bootbox-body textarea').val().trim();
        if(newNote){
            noteData = {
                _id: $(this).data('article')._id,
                noteText: newNote

            };
            $.post('/api/notes', noteData).then(()=>{
                bootbox.hideAll();
            })
        }
    }

    const handleNoteDelete = ()=>{
        let noteToDelete = $(this).data("_id");

        $.ajax({
            url: "/api/notes/" + noteToDelete,
            method: "DELETE"
        }).then(()=>{
            bootbox.hideAll()
        });
    }
    initPage();
    $(document).on('click', '.btn.delete', handleArticleDelete);
    $(document).on('click', '.btn.notes', handleArticleNotes);
    $(document).on('click', '.btn.save', handleNoteSave);
    $(document).on('click', '.btn.note-delete', handleNoteDelete);
   
})