app.controller(
  "AdminController",
  ($scope, $http, AdminService, SessionService) => {
    $scope.products = [];
    console.log("Admin:", AdminService.isAdmin());

    $scope.getProducts = () => {
      $http.get("http://localhost:3333/api/products").then((response) => {
        $scope.products = response.data;
      });
    };

    $scope.deleteProduct = (id) => {
      $http
        .delete("http://localhost:3333/api/products/" + id, {
          headers: {
            Authorization: "Bearer " + SessionService.getToken(),
          },
        })
        .then(() => {
          $scope.getProducts();
        });
    };

    $scope.logout = SessionService.logout;

    $scope.isAdmin = AdminService.isAdmin();
    $scope.isAuthenticated = SessionService.isAuthenticated();
    $scope.getProducts();
  }
);
