var app = new Vue({
	el: '#app',
	methods:
	{
		parseJson()
		{
			this.jsonError = false;

			try
			{
				this.rows = JSON.parse(this.rawJson);
				this.generateKeys();
			}
			catch(e)
			{
				this.jsonError = true;
			}
		},
		generateKeys()
		{
			this.keys = [];

			if (this.rows && this.rows.length)
			{
				this.keys = Object.keys(this.rows[0]);
			}
		},
		generateCommands()
		{
			this.message = this.rows.map(row => this.options.prepend + row[this.selectedKey] + this.options.append).join(", ");
		}
	},
	mounted() {
		this.parseJson();
		this.generateCommands();
	},
	watch:
	{
		selectedKey()
		{
			this.generateCommands();
		},
		rawJson()
		{
			this.parseJson();
		},
        options:
        {
            handler()
            {
                this.generateCommands();
            },
            deep: true,
        }
	},
	data: {
		message: "",
		rawJson: "[{\"key\": \"my value 1\"}, {\"key\": \"my value 2\"}]",
		keys: [],
		rows: [],
		selectedKey: "key",
		jsonError: false,
		options: {
			append: "",
			prepend: "!",
		}
	}
});