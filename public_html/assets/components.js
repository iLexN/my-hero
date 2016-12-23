/* global lol */

var store = function (name) {
    var db = new PouchDB(name);

    function dbRemove() {
        db.destroy().then(function (response) {
            console.log('success destroy');
        }).catch(function (err) {
            console.log(err);
        });
    }
    function dbClear() {
        db.viewCleanup().then(function (result) {
            // handle result
            console.log(result);
        }).catch(function (err) {
            console.log(err);
        });
    }
    return {
        'db': db,
        'dbClear': dbClear,
        'dbRemove': dbRemove
    };
};
var ac1 = new store('iLexN');
var ac2 = new store('iLexSo7');


var heroList = {
    template: '#heroList',
    props: {
        h: Object,
        f: String,
        ac : String
    },
    data: function () {
        return {
            db: [],
            isDone: false,
            isShow: true,
            useAC : Object
        };
    },
    created: function () {
        this.isDone = false;
        this.getAC();
        this.getDB();
    },
    watch: {
        f: function (val, oldVal) {
            this.isShow = false;
            if (val === '') {
                this.isShow = true;
            } else if (val === 'box' && this.db.box === true) {
                this.isShow = true;
            } else if (val === 'star' && this.db.star === true) {
                this.isShow = true;
            } else if (val === 'nobox' && this.db.box === false) {
                this.isShow = true;
            }
        },
        ac : function(){
            this.getAC();
            this.getDB();
        }
    },
    computed: {
        imgUrl: function () {
            return lol.getHeroImg(this.h.image.full);
        },
        bgUrl: function () {
            return lol.getLoadingScreen(this.h.id);
        },
        hasBoxIconStyle: function () {
            if (this.db.box) {
                return '';
            } else {
                return 'blur';
            }
        },
        hasStarIconStyle: function () {
            if (this.db.star) {
                return '';
            } else {
                return 'blur';
            }
        }
    },
    methods: {
        loadBox: function () {
            if (this.db.box) {
                this.delBox();
            } else {
                this.addBox();
            }
        },
        addBox: function () {
            this.db.box = true;
            this.updatDB();
        },
        delBox: function () {
            this.db.box = false;
            this.updatDB();
        },
        loadStar: function () {
            if (this.db.star) {
                this.delStar();
            } else {
                this.addStar();
            }
        },
        addStar: function () {
            this.db.star = true;
            this.updatDB();
        },
        delStar: function () {
            this.db.star = false;
            this.updatDB();
        },
        getDB: function () {
            var self = this;
            this.useAC.db.get(this.h.id).then(function (doc) {
                self.db = doc;
                self.isDone = true;
                //console.log('done');
            }).catch(function (err) {
                self.createDB();
            });
        },
        updatDB: function () {
            var self = this;
            this.useAC.db.put(this.db, function callback(err, result) {
                self.db._rev = result.rev;
            });
        },
        createDB: function () {
            var info = {
                _id: this.h.id,
                hero: this.h.id,
                box: false,
                star: false
            };
            var self = this;
            this.useAC.db.put(info, function callback(err, result) {
                //console.log(result);
                self.getDB();
            });
        },
        getAC : function(){
            if ( this.ac === 'iLexN'){
                this.useAC = ac1;
            } else {
                this.useAC = ac2;
            }
            this.use
        }
    }
};

//var db = new PouchDB('MyHero');
//var remoteCouch = false;
//
//function dbRemove() {
//    db.destroy().then(function (response) {
//        console.log('success destroy');
//    }).catch(function (err) {
//        console.log(err);
//    });
//}
//function dbClear() {
//    db.viewCleanup().then(function (result) {
//        // handle result
//        console.log(result);
//    }).catch(function (err) {
//        console.log(err);
//    });
//}
