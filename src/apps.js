document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [{
                id: 1,
                name: '100% Arabica Bean',
                img: '1.jpg',
                price: 99000
            },
            {
                id: 2,
                name: 'Graffeo Coffee',
                img: '2.jpg',
                price: 99000
            },
            {
                id: 4,
                name: 'Santa Flor',
                img: '4.jpg',
                price: 99000
            },
            {
                id: 5,
                name: 'Ethiopia Guji Natural',
                img: '5.jpg',
                price: 99000
            }
        ],


    }));
    
    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            
            //cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);
            
            //jika cart masih kosong
            if (!cartItem) {
                this.items.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price
                });
                this.quantity++;
                this.total += newItem.price
            } else {
                //jika barang nya sudah ada di cart apakah bara nya sama atau beda
                this.items = this.items.map((item) => {
                    //jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        //jika barang sudah ada tambah total dan quantity nya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price
                        return item;
                    }
                });
            }
        },
        remove(id) {
            //ambil item yang mau di remove
            const cartItem = this.items.find((item) => item.id === id);
    
            //jika item lebih dari 1
            if (cartItem.quantity > 1) {
                //telusuri 1 1
                this.items = this.items.map((item) => {
                    //jika bukan barang yang diklik
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= cartItem.price;
                        return item
                    }
                })
            }else if (cartItem.quantity === 1){
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

//Koversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};