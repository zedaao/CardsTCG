app.controller(
  "AdminEditProductController",
  ($scope, $http, SessionService, AdminService) => {
    $scope.name = "";
    $scope.price = "R$ 0,00";
    $scope.description = "";
    $scope.type = "";
    $scope.imageUrl = "";

    function getProduct() {
      const searchParams = new URLSearchParams(location.search);
      const productId = searchParams.get("productId");
      console.log(productId);

      $http
        .get("http://localhost:3333/api/products/" + productId)
        .then((response) => {
          $scope.price = response.data.price.toFixed(2);
          $scope.name = response.data.name;
          $scope.formatPrice();
          $scope.description = response.data.description;
          $scope.type = response.data.type;
          $scope.imageUrl = response.data.imageUrl;
        });
    }
    getProduct();

    $scope.formatPrice = () => {
      const price = Number($scope.price.replace(/\D/g, "")).toString();
      let priceStr = price.padStart(3, "0");
      let priceArr = priceStr.split("");
      priceArr.splice(priceArr.length - 2, 0, ",");
      $scope.price = "R$" + priceArr.join("");
    };

    $scope.handleSubmit = () => {
      const searchParams = new URLSearchParams(location.search);
      const productId = searchParams.get("productId");
      $http
        .patch(
          "http://localhost:3333/api/products/" + productId,
          {
            name: $scope.name,
            price: Number($scope.price.replace(/\D/g, "") / 100),
            type: $scope.type,
            description: $scope.description,
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
