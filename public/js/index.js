app.controller(
  "HomeController",
  ($scope, $http, AdminService, SessionService) => {
    $scope.products = [];
    $scope.pokemon = [];
    $scope.yugioh = [];
    $scope.magic = [];
    $scope.decks = [];
    console.log("Admin:", AdminService.isAdmin());
    $scope.getProducts = () => {
      $http.get("http://localhost:3333/api/products").then((response) => {
        $scope.products = response.data;

        $scope.products.forEach((item) => {
          if (item.type == "pokemon") {
            $scope.pokemon.push(item);
          }
          if (item.type == "deck") {
            $scope.decks.push(item);
          }
          if (item.type == "yugioh") {
            $scope.yugioh.push(item);
          }
          if (item.type == "magic") {
            $scope.magic.push(item);
          }
        });
      });
    };

    $scope.logout = () => {
      localStorage.removeItem("token");
      location.href = "/";
    };

    $scope.isAdmin = AdminService.isAdmin();
    $scope.isAuthenticated = SessionService.isAuthenticated();
    $scope.getProducts();
  }
);
