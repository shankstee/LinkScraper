function scrapeData() {
    $.ajax({
        url: '/scrapeComics'
    }).then( () => {
        location.reload();
    });
  };