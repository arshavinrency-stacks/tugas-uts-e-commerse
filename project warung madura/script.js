const products = [
  { id: 1, name: "Rokok", price: 35000, image: "roko.jpg" },
  { id: 2, name: "Minuman Dingin", price: 10000, image: "minuman.jpg" },
  { id: 3, name: "Chiki", price: 10000, image: "chiki.jpg" },
  { id: 4, name: "Kopi", price: 15000, image: "Kopi.jpg" },
  { id: 5, name: "Es Krim", price: 5000, image: "Es Krim.jpg" },
  { id: 6, name: "Telur", price: 23000, image: "Telur.jpg" },
  { id: 7, name: "Indomie", price: 6000, image: "Indomie.jpg" },
  { id: 8, name: "Korek Api", price: 5000, image: "Korek.jpg" },
  { id: 9, name: "Obat-obat", price: 5000, image: "Obat.jpg" },
  { id: 10, name: "Sandal", price: 10000, image: "Sandal.jpg" },
  { id: 11, name: "Beras", price: 24000, image: "Beras.jpg" },
  { id: 12, name: "Gula", price: 25000, image: "Gula.jpg" },
];

const productContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const bayarInput = document.getElementById("bayar");
const kembalianEl = document.getElementById("kembalian");

let cart = [];

// 🔹 Tampilkan semua produk
function renderProducts() {
  products.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>Rp ${p.price.toLocaleString()}</p>
      <button onclick="addToCart(${p.id})">Tambah</button>
    `;
    productContainer.appendChild(div);
  });
}

// 🔹 Tambah produk ke keranjang
function addToCart(id) {
  const item = products.find((p) => p.id === id);
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

// 🔹 Tampilkan isi keranjang
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.qty} - Rp ${(item.price * item.qty).toLocaleString()}`;
    cartContainer.appendChild(li);
  });
  totalEl.textContent = `Total: Rp ${total.toLocaleString()}`;
  return total;
}

// 🔹 Proses pembayaran
document.getElementById("checkout").addEventListener("click", () => {
  const total = renderCart();
  const bayar = parseInt(bayarInput.value);

  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  if (isNaN(bayar) || bayar <= 0) {
    alert("Masukkan nominal pembayaran yang valid!");
    return;
  }

  if (bayar < total) {
    alert("Uang anda kurang! Silakan tambahkan nominal pembayaran.");
    kembalianEl.textContent = "";
    return;
  }

  const kembalian = bayar - total;
  kembalianEl.textContent = `Kembalian: Rp ${kembalian.toLocaleString()}`;

  alert("💖 Terima kasih sudah belanja di Warung Madura!");
  cart = [];
  renderCart();
  bayarInput.value = "";
});

renderProducts();
