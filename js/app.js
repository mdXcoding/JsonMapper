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
  		this.message = this.rows.map(row => '!' + row[this.selectedKey]).join(', ');
  	}
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
  	}
  },
  data: {
    message: "",
    rawJson: "",
    keys: [],
    rows: [],
    selectedKey: "",
    jsonError: false,
  }
});