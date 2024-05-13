app.controller(
  "ViewProductController",
  ($scope, $http, SessionService, AdminService) => {
    $scope.name = "";
    $scope.price = "R$ 0,00";
    $scope.description = "";
    $scope.type = "";
    $scope.imageUrl = "";
    $scope.id = "";

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
          $scope.id = Number(productId);
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

    $scope.addToCart = (productId) => {
      if (!$scope.isAuthenticated) {
        location.href = "/login.html";
        return;
      } else {
      }

      $http.post(
        "http://localhost:3333/api/carts",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${SessionService.getToken()}`,
          },
        }
      );
      location.href = "./cart.html";
    };

    $scope.isAuthenticated = SessionService.isAuthenticated();
    $scope.isAdmin = AdminService.isAdmin();
    $scope.logout = SessionService.logout;
  }
);
