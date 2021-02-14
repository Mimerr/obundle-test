import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import CategoryCartManager from './category-cart-manager';

export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    onReady() {
        this.arrangeFocusOnSortBy();

        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context.urls);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));

        $(".category-add-all").on("click", this.addAllToCart);
        $("#cart-remove-all").on("click", this.emptyCart);

        this.ariaNotifyNoProducts();
    }

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }

    addAllToCart() {
        var products = [];
        $(".quickview[data-product-id]").each(function(i, product) {
            products.push({"quantity": 1, "productId": $(product).attr("data-product-id")});
        });
        var productsToSend = { "lineItems": products }

        CategoryCartManager.getCart("/api/storefront/carts/").then(data => {
            if (data.length > 0) {
                console.log("GET CART");
                CategoryCartManager.addProducts("/api/storefront/carts/", data[0].id, productsToSend)
                    .then(() => {
                        var notify = document.getElementById("category-cart-alert");
                        notify.className = "show";
                        setTimeout(function(){ notify.className = notify.className.replace("show", ""); }, 3000);
                    });
            }
            else {
                console.log("CREATE CART");
                CategoryCartManager.createCart("/api/storefront/carts/", productsToSend)
                    .then(() => {
                        var notify = document.getElementById("category-cart-alert");
                        notify.className = "show";
                        setTimeout(function(){ notify.className = notify.className.replace("show", ""); }, 3000);
                    });
            }
        });

        var emptyBtn = document.getElementById("cart-remove-all");
        emptyBtn.classList.add("show");
    }

    emptyCart() {
        var emptyBtn = document.getElementById("cart-remove-all");
        emptyBtn.classList.remove("show");
        CategoryCartManager.getCart("/api/storefront/carts/").then(data => {
            if (data.length > 0) {
                CategoryCartManager.deleteCart("/api/storefront/carts/", data[0].id);
            }
        }).then(() => {
            var notify = document.getElementById("empty-cart-alert");
            notify.className = "show";
            setTimeout(function(){ notify.className = notify.className.replace("show", ""); }, 3000);
        });
    }
}
