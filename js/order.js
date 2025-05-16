    document.getElementById("orderForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const orders = [];
      document.querySelectorAll(".order").forEach(order => {
        const pizzaName = order.querySelector("[name='pizzaName']").value;
        const size = order.querySelector("[name='size']").value;
        const quantity = order.querySelector("[name='quantity']").value;

        if (pizzaName && size && quantity > 0) {
          orders.push({ name: pizzaName, size, quantity: parseInt(quantity) });
        }
      });

      if (orders.length === 0) {
        alert("주문 정보를 입력해주세요.");
        return;
      }

      axios.post("http://localhost:3000/order", { lines: orders })
        .then(response => {
          alert("주문이 완료되었습니다!");
          window.location.href = "home.html";  // 홈으로 이동
        })
        .catch(error => {
          console.error("주문 실패:", error);
          alert("주문에 실패했습니다. 다시 시도해주세요.");
        });
    });

    function addOrder() {
      const container = document.getElementById("ordersContainer");
      const newOrder = document.createElement("div");
      newOrder.className = "order";
      newOrder.innerHTML = `
        <input type="text" name="pizzaName" placeholder="피자명">
        <select name="size">
          <option value="">크기 선택</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <input type="number" name="quantity" placeholder="수량" min="1" value="1">
      `;
      container.appendChild(newOrder);
    }