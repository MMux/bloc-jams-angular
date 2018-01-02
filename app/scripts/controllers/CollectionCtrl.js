(function() {
  function CollectionCtrl(Fixtures) {
    this.albums = Fixtures.getCollection(12);
    console.log(Fixtures);
  }

  angular
    .module('blocJams')
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
