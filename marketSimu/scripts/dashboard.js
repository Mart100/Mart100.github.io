class Dashboard {
	constructor() {

		this.popups = []
		this.currentWindow = 'companies'
		this.currentCompany = null
		this.currentGraphs = {}

		this.navigatorEvents()
	}
	navigatorEvents() {
		$('#nav > div').on('click', (event) => {
			let target = $(event.target)
			let id = target.attr('id')
			let pageName = id.replace('nav-', '')

			this.currentWindow = pageName

			$('#nav > div').removeClass('active')	
			target.addClass('active')

			$('#pages > .page').fadeOut()

			$(`#page-${pageName}`).fadeIn()
		})
	}
	refreshCompaniesList() {

		let sortedCompanies = world.companies.sort((a, b) => b.earnings-a.earnings)

		$('#page-companies .companyList .content').html('')
		for(let company of sortedCompanies) {

			let lastRecap = company.getLastRecap()

			let growthImage = 'https://i.imgur.com/Nzo3Y6H.png'

			if(lastRecap.balanceChanges > 0) growthImage = 'https://i.imgur.com/Nzo3Y6H.png'
			if(lastRecap.balanceChanges < 0) growthImage = 'https://i.imgur.com/wDcZzA8.png'

			let companyElem = $(`
			<div class="company">
				<span class="name">${company.name}</span>
				<span class="balance">${Math.round(company.balance)}</span>
				<span class="growth"><img src="${growthImage}"/></span>
			</div>
			`)

			if(dashboard.currentCompany == company) companyElem.addClass('selected')
	
			companyElem.on('click', () => {
				this.focusCompany(company)
				
				$('#page-companies .companyList .content > .company').removeClass('selected')

				companyElem.addClass('selected')

				$('#page-companies .companyInfo').animate({'opacity': '0.8'}, 100, () => {
					$('#page-companies .companyInfo').animate({'opacity': '1'}, 100)
				})
			})
	
			$('#page-companies .companyList .content').append(companyElem)
		}
	}
	focusCompany(company) {

		this.currentCompany = company
		$('#page-companies .companyInfo > .title').html(company.name)


		// Products

		let sortedProducts = company.products.sort((a, b) => b.sales-a.sales)
		$('#page-companies .companyInfo .products .content').html('')
		for(let productInfo of sortedProducts) {

			let productName = productInfo.name

			let product = world.allProducts.find(p => p.name == productName)

			
			let productTypeColor = ''
			if(product.productionType == 'm') productTypeColor = 'green'
			if(product.productionType == 's') productTypeColor = 'blue'
			if(product.productionType == 'b') productTypeColor = 'red'
			if(product.productionType == 'r') productTypeColor = 'black'


			let productElem = $(`
			<div class="product">
				<span class="name">${product.name}</span>
				<span class="sales">${productInfo.sales}</span>
				<span class="productionType" style="color: ${productTypeColor}">${product.productionType}</span>
			</div>`)

			productElem.on('click', () => {
				this.createProductPopup(productInfo, company)
			})

			$('#page-companies .companyInfo .products .content').append(productElem)
		}


		// Inventory

		let inventoryArray = []
		for(let productName in company.inventory) inventoryArray.push({name: productName, amount: company.inventory[productName].amount})
		let sortedInventory = inventoryArray.sort((a, b) => b.amount-a.amount)
		$('#page-companies .companyInfo .inventory .content').html('')
		for(let productInfo of sortedInventory) {

			let product = world.getProduct(productInfo.name)

			let productTypeColor = ''
			if(product.productionType == 'm') productTypeColor = 'green'
			if(product.productionType == 's') productTypeColor = 'blue'
			if(product.productionType == 'b') productTypeColor = 'red'
			if(product.productionType == 'r') productTypeColor = 'black'

			let productElem = $(`
			<div class="product">
				<span class="name">${productInfo.name}</span>
				<span class="amount">${productInfo.amount}</span>
				<span class="productionType" style="color: ${productTypeColor}">${product.productionType}</span>
			</div>`)

			productElem.on('click', () => {
				this.createProductPopup(productInfo, company)
			})

			$('#page-companies .companyInfo .inventory .content').append(productElem)
		}

		// earnings graph
		let earningsArray = company.recaps.map((recap) => recap.balanceChanges)
		let earningsArrayAges = company.recaps.map((recap) => ''+Math.floor(recap.age/100))
		//console.log(earningsArray, earningsArrayAges)

		if(this.currentGraphs['company-earningsGraph']) {

			let chart = this.currentGraphs['company-earningsGraph']
			chart.data.datasets[0].data = earningsArray
			chart.data.labels = earningsArrayAges
			this.currentGraphs['company-earningsGraph'].update()

		} else {

			let earningsGraphChart = new Chart($('#page-companies .companyInfo .earningsgraph canvas'), {
				type: 'bar',
				data: {
					labels: earningsArrayAges,
					datasets: [{
						label: 'profit',
						backgroundColor: 'rgb(50, 200, 50)',
						data: earningsArray
					}]
				},
				
				options: {}
			})
			this.currentGraphs['company-earningsGraph'] = earningsGraphChart

		}

		


		// Details
		$('#page-companies .companyInfo .details .content').html(`
		<div>Name: ${company.name}</div>
		<div>Balance: ${Math.round(company.balance)}</div>
		<div>Age: ${Math.floor(company.age/100)}</div>
		<div>Earnings: ${Math.round(company.earnings)}</div>
		<div>Employees: ${company.employees}</div>
		`)
	}
	createProductPopup(productInfo, company) {

		let product = world.getProduct(productInfo.name)

		let supplier = productInfo.suppliers && productInfo.suppliers[product.name] ? productInfo.suppliers[product.name] : 'None'

		console.log(productInfo)

		let productType = ''
		if(product.productionType == 'm') productType = 'final-product'
		if(product.productionType == 's') productType = 'sub-product'
		if(product.productionType == 'b') productType = 'base-product'
		if(product.productionType == 'r') productType = 'raw-material'

		let elem = $(`
			<div class="components panel list">
				<div class="title">Components</div>
				<div class="content">
				
				</div>
			</div>
			<div class="details panel list">
				<div class="title">Details</div>
				<div class="content">
					<div>Company: ${company.name}</div>
					<div>Supplier: ${supplier}</div>
					<div>Type: ${productType}</div>
					<div>Price: ${productInfo.price}</div>
					<div>Amount: ${product.amount}</div>
					<div>Quality: ${product.quality}</div>
				</div>
			</div>
			<div class="supply panel list">
				<div class="title">Total Supply</div>
				<div class="content">
				
				</div>
			</div>
			<div class="demand panel list">
				<div class="title">Total Demand</div>
				<div class="content">
				
				</div>
			</div>
		`)

		// total supply
		let supplyCompanies = world.companies.filter(c => c.findProduct(productInfo.name))
			.sort((a, b) => {
			return b.inventory[product.name].amount-a.inventory[product.name].amount
		})

		for(let company of supplyCompanies) {

			let amount = company.inventory[product.name].amount

			let elem1 = $(`
			<div>
				<span class="company">${company.name}</span>
				<span class="amount">${amount}</span>
			</div>
			`)
			//console.log(elem1, $(elem[4]), $(elem[4]).find('.content'))
			$(elem[4]).find('.content').append(elem1)
		}


		// total demand
		// total supply
		let demandCompanies = world.companies.filter(c => c.demand[product.name] > 5)
			.sort((a, b) => {
			return b.demand[product.name]-a.demand[product.name]
		})

		for(let company of demandCompanies) {

			let amount = company.demand[product.name]

			let elem1 = $(`
			<div>
				<span class="company">${company.name}</span>
				<span class="amount">${amount}</span>
			</div>
			`)
			//console.log(elem1, $(elem[4]), $(elem[4]).find('.content'))
			$(elem[6]).find('.content').append(elem1)
		}


		// recipe , components

		if(product.recipe) {
			for(let component of product.recipe) {
				let elem1 = $(`
				<div>
					<span class="name">${component.name}</span>
				</div>
				`)

				elem1.on('click', () => {
					let supplierComp

					if(productInfo.suppliers && productInfo.suppliers[component.name]) supplierComp = productInfo.suppliers[component.name]

					let componentInfo = component

					if(supplierComp) componentInfo = world.getCompany(supplierComp).findProduct(component.name)

					this.createProductPopup(component, company)
				})

				$(elem[0]).find('.content').append(elem1)
			}
		}

		this.createPopupWindow(product.name, elem, 1000, 600)
	}
	createPopupWindow(title, content, width, height) {
		let id = `popup-${Math.floor(Math.random()*100000)}`
		let elem = $(`
		<div class="popupbg" id="${id}">
			<div class="panel popup product" style="width: ${width}px; height: ${height}px;">
				<div class="title">${title}</div>
				<div class="close">
					<img src="https://i.imgur.com/tFni0fd.png" />
				</div>
				<div class="content">

				</div>
			</div>
		<div>
		`)

		elem.find('.content').append(content)
		let popupData = {
			element: elem,
			dragging: false,
			dragOffset: {x: 0, y: 0}
		}
		this.popups.push(popupData)

		// dragging
		elem.find('.panel').on('mousedown', (event) => {
			let target = $(event.target)
			if(!target.hasClass('popup')) return
			popupData.dragging = true
			popupData.dragOffset.x = event.offsetX
			popupData.dragOffset.y = event.offsetY
		})

		elem.on('mousemove', (event) => {

			if(!popupData.dragging) return

			let x = event.clientX-popupData.dragOffset.x+popupData.element.find('.panel').width()/2 +10
			let y = event.clientY-popupData.dragOffset.y+popupData.element.find('.panel').height()/2 +10

			elem.find('.panel').css({'left': `${x}px`, 'top': `${y}px`})
		})

		elem.on('mouseup', (event) => {
			popupData.dragging = false
		})

		elem.find('.close').on('click', () => {
			$(`#${id}`).remove()
			this.popups.splice(this.popups.indexOf(elem), 1)
		})

		$('body').append(elem)
	}
}