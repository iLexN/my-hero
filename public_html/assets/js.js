/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var lol = (function (version) {
    var cdn = 'http://ddragon.leagueoflegends.com/cdn/';

    function getSquareImg(heroImg) {
        //console.log(heroImg);
        return cdn + version + '/img/champion/' + heroImg;
    }

    function getLoadingScreen(id) {
        return cdn + '/img/champion/loading/' + id + '_0.jpg';
    }

    return {
        'getHeroImg': getSquareImg,
        'getLoadingScreen': getLoadingScreen
    };
})(lolVersion);

//lol.getHeroImg('Ahri.png' );

var app = new Vue({
    el: '#app',
    data: {
        hero: [],
        filterTags: '',
        filterTags2: '',
        ac: 'iLexN'
    },
    created: function () {
        this.getAllHero();
    },
    components: {
        'my-hero': heroList
    },
    computed: {
        heroList: function () {
            var newList = this.hero;
            var filterValue = this.filterTags;
            if (filterValue === '') {
                return newList;
            }
            newList = _.filter(this.hero, function (o) {
                return o.tags[0] === filterValue || o.tags[1] === filterValue;
            });
            return newList;
        }
    },
    methods: {
        getAllHero: function () {
            var self = this;
            $.getJSON("data/champion.json", function (data) {
                self.hero = data.data;
            });
        },
        setFilterTag: function (tag, event) {
            $(".filterBar button").removeClass('red');
            if (this.filterTags === tag) {
                this.filterTags = '';
            } else {
                this.filterTags = tag;
                event.target.className = 'btn red';
            }
        },
        setFilterTag2: function (tag, event) {
            $(".filterTag button").removeClass('red');
            if (this.filterTags2 === tag) {
                this.filterTags2 = '';
            } else {
                this.filterTags2 = tag;
                if (event.target.nodeName === 'IMG') {
                    event.target.parentNode.className = 'btn red';
                } else {
                    event.target.className = 'btn red';
                }
            }
        },
        setFilterAC: function (tag) {
            //$(".findAC button").removeClass('red');
            this.ac = tag;
            //event.target.className = 'btn red';
        }
    }
});
