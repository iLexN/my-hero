/* global nw, ac1, app, ac2*/
var win = nw.Window.get();

var menu = new nw.Menu({type: 'menubar'});

// Create a submenu as the 2nd level menu
var submenu = new nw.Menu();
submenu.append(new nw.MenuItem({
    label: 'Cleanup Database',
    click: function () {
        ac1.dbClear();
        ac2.dbClear();
    }
}));
submenu.append(new nw.MenuItem({
    label: 'Reset Database',
    click: function () {
        ac1.dbRemove();
        ac2.dbRemove();
        win.reload();
    }
}));
submenu.append(new nw.MenuItem({
    label: 'Export Database',
    click: function () {
        $("#dbFilepathOut").click();
    }
}));
submenu.append(new nw.MenuItem({
    label: 'Inport Database',
    click: function () {
        $("#dbFilepathIn").click();
    }
}));

var menu2 = new nw.Menu({type: 'menubar'});
var submenu2 = new nw.Menu();
submenu2.append(new nw.MenuItem({
    label: 'iLexN',
    click: function () {
        app.setFilterAC('iLexN');
        app.filterTags = '';
        app.filterTags2 = '';
        $("button").removeClass('red');
    }
}));
submenu2.append(new nw.MenuItem({
    label: 'iLexSo7',
    click: function () {
        app.setFilterAC('iLexSo7');
        app.filterTags = '';
        app.filterTags2 = '';
        $("button").removeClass('red');
    }
}));


// Create and append the 1st level menu to the menubar
menu.append(new nw.MenuItem({
    label: 'Database',
    submenu: submenu
}));
menu.append(new nw.MenuItem({
    label: 'Choose AC',
    submenu: submenu2
}));

// Assign it to `window.menu` to get the menu displayed
nw.Window.get().menu = menu;


//export db
var fs = require('fs');
function exportDB() {
    var $p = $("#dbFilepathOut");
    /*
     ac1.db.dump(ws).then(function (res) {
     console.log(res);
     //$p.val('');
     });
     */
    ac1.db.allDocs({
        include_docs: true
    }).then(function (result) {
        // handle result
        var json = JSON.stringify(_.map(result.rows, 'doc'));
        fs.writeFile($p.val(), json, 'utf8', (err) => {
            if (err)
                throw err;
            console.log('It\'s saved!');
        });
    }).catch(function (err) {
        console.log(err);
    });
}

function inportDB() {
    var $p = $("#dbFilepathIn");
    /*
     var rs = fs.createReadStream($p.val());
     console.log($p.val());
     console.log('in db');
     ac1.db.load(rs).then(function (res) {
     console.log(res);
     });
     */
    fs.readFile($p.val(), 'utf8', (err, data) => {
        if (err)
            throw err;
        
        var obj = JSON.parse(data);
        var db = new PouchDB(app.ac);

        var done = _.after(obj.length, function () {
            console.log('done saving!');
            win.reload();
        });

        _.forEach(obj, function (heroObj) {
            var info = {
                _id: heroObj._id,
                hero: heroObj.id,
                box: heroObj.box,
                star: heroObj.star
            };
            db.put(info, done);
        });
    });
}

$("#dbFilepathOut").change(function () {
    exportDB();
});
$("#dbFilepathIn").change(function () {
    if ( app.ac === 'iLexN') {
        ac1.dbRemove();
    } else {
        ac2.dbRemove();
    }
    inportDB();
});

