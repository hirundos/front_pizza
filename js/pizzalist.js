 axios.get('http://localhost:3000/menu') 
      .then(response => {
        const data = response.data;
        const tbody = document.getElementById('pizza-table-body');

        data.forEach(item => {
          const row = document.createElement('tr');

          const nameCell = document.createElement('td');
          nameCell.textContent = item.name;

          const sizeCell = document.createElement('td');
          sizeCell.textContent = item.size;

          const priceCell = document.createElement('td');
          priceCell.textContent = `${item.price}달러`;

          row.appendChild(nameCell);
          row.appendChild(sizeCell);
          row.appendChild(priceCell);

          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('메뉴를 불러오는 중 오류 발생:', error);
      });