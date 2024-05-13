app.controller(
  "AdminCreateProductController",
  ($scope, $http, SessionService, AdminService) => {
    $scope.name = "";
    $scope.price = "";
    $scope.description = "";
    $scope.type = "";
    $scope.imageUrl = "";

    $scope.formatPrice = () => {
      const price = Number($scope.price.replace(/\D/g, "")).toString();
      let priceStr = price.padStart(3, "0");
      let priceArr = priceStr.split("");
      priceArr.splice(priceArr.length - 2, 0, ",");
      $scope.price = "R$" + priceArr.join("");
    };

    $scope.handleSubmit = () => {
      $http
        .post(
          "http://localhost:3333/api/products",
          {
            name: $scope.name,
            price: Number($scope.price.replace(/\D/g, "") / 100),
            description: $scope.description,
            type: $scope.type,
            imageUrl: $scope.imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${SessionService.getToken()}`,
            },
          }
        )
        .then(() => {
          location.href = "/admin";
        });
    };

    $scope.isAdmin = AdminService.isAdmin();
    $scope.isAuthenticated = SessionService.isAuthenticated();
    $scope.logout = SessionService.logout;
  }
);
