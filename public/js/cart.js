app.controller(
  "CartController",
  ($scope, $http, SessionService, AdminService) => {
    $scope.items = [];
    console.log("Admin:", AdminService.isAdmin());

    function getCart() {
      $http
        .get("http://localhost:3333/api/carts", {
          headers: {
            authorization: `Bearer ${SessionService.getToken()}`,
          },
        })
        .then((response) => {
          if (response.data) {
            $scope.items = response.data.items;
            $scope.total = $scope.items.reduce(
              (acc, cur) => acc + cur.price * cur.quantity,
              0
            );
          }
        });
    }

    function updateCart(productId, quantity) {
      $http
        .patch(
          "http://localhost:3333/api/carts",
          {
            productId,
            quantity,
          },
          {
            headers: {
              authorization: `Bearer ${SessionService.getToken()}`,
            },
          }
        )
        .then();
    }

    $scope.onQuantityChange = (id) => {
      const item = $scope.items.find((item) => item.id === id);

      item.quantity = String(item.quantity).replace(/\D/g, "").trim();

      item.quantity = Number(item.quantity || "0");

      item.quantity = item.quantity < 1 ? 1 : item.quantity;
      $scope.total = $scope.items.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
      updateCart(item.productId, item.quantity);
    };

    $scope.deleteCartItem = (productId) => {
      $http
        .delete("http://localhost:3333/api/carts/" + productId, {
          headers: {
            authorization: `Bearer ${SessionService.getToken()}`,
          },
        })
        .then(() => {
          getCart();
        });
    };

    $scope.closeCart = () => {
      $http
        .patch(
          "http://localhost:3333/api/carts",
          {
            closed: true,
          },
          {
            headers: {
              authorization: `Bearer ${SessionService.getToken()}`,
            },
          }
        )
        .then(() => {
          location.href = "purchases.html";
        });
    };

    $scope.increase = (id) => {
      const item = $scope.items.find((item) => item.id === id);
      item.quantity++;
      $scope.onQuantityChange(id);
    };
    $scope.decrease = (id) => {
      const item = $scope.items.find((item) => item.id === id);
      item.quantity--;
      $scope.onQuantityChange(id);
    };

    $scope.isAuthenticated = SessionService.isAuthenticated();
    SessionService.createVerifyLoginInterval();
    $scope.logout = SessionService.logout;
    getCart();
  }
);
