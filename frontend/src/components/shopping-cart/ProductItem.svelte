<script>
    import {goto} from "$app/navigation";

    let {product, loadRows} = $props();


    async function removeProduct() {
        const res = await fetch('http://localhost:3000/shopping-cart/remove/' + product.rowId, {
            credentials: "include",
            method: 'DELETE'
        });
        if (res.status === 200) {
            loadRows();
        }
    }


    async function changeProductToShoppingCart(product) {

        const data = {
            id: product.rowId,
            userId: product.userId,
            productId: product.productId,
            quantity: product.quantity,
        };

        const res = await fetch('http://localhost:3000/shopping-cart/change', {
            credentials: "include",
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const status = (await res.json()).status;


        if (status === 401) {
            goto('/auth/login');
        }
        await loadRows();
    }

    function decrement() {
        if (product.quantity === 0) {
            product.quantity;
        } else {
            product.quantity--;
        }
        changeProductToShoppingCart(product);
    }

    function increment() {
        if (product.quantity === 10) {
            product.quantity;
        } else {
            product.quantity++;
        }
        changeProductToShoppingCart(product);
    }
</script>

<div class="rounded-lg border-2 border-pink-700 p-4 shadow-sm">
    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" class="shrink-0 md:order-1">
            <img class="h-25 w-20"
                 src="{product.productImg}"
                 alt="image"/>
        </a>


        <label for="counter-input" class="sr-only">Choose quantity:</label>
        <div class="flex items-center justify-between md:order-3 md:justify-end">
            <div class="flex items-center">
                <button type="button" id="decrement-button"
                        onclick="{decrement}"
                        data-input-counter-decrement="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-50 hover:bg-[#F7FFBC] hover:border-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100">
                    <svg class="h-2.5 w-2.5 text-gray-900"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M1 1h16"/>
                    </svg>
                </button>
                <input type="text" id="counter-input" data-input-counter
                       class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                       placeholder="" value="{product.quantity}" required/>
                <button type="button" id="increment-button"
                        onclick="{increment}"
                        data-input-counter-increment="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-50 hover:bg-[#F7FFBC] hover:border-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100">
                    <svg class="h-2.5 w-2.5 text-gray-900" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
            <div class="text-end md:order-4 md:w-32">
                <p class="text-base font-bold text-gray-900">₽{product.productPrice}</p>
            </div>
        </div>


        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <a href="#"
               class="text-base font-medium text-gray-900 hover:underline">{product.productName}</a>

            <div class="flex items-center gap-4">
                <button type="button"
                        onclick="{removeProduct}"
                        class="inline-flex items-center text-sm font-medium text-pink-700 hover:underline">
                    <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                    Удалить
                </button>
            </div>
        </div>
    </div>
</div>