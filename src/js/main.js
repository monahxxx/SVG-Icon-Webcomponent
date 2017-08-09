class SVGIcon extends HTMLElement {
	getTemplate(icon) {
		return `<svg><use xlink:href="symbol/svg/sprite.symbol.svg#${icon}"></use></svg>`;
	} 
	connectedCallback(){
		this.innerHTML = this.getTemplate(this.getAttribute('icon'));
	}
	static get observedAttributes() {
		return ['icon'];
	}
	attributeChangedCallback(attributeName, oldValue, newValue) {
		if (attributeName === 'icon') {
			this.innerHTML = this.getTemplate(newValue);
		}
	}
}

customElements.define('svg-icon', SVGIcon);