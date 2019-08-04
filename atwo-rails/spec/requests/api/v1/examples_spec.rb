require "rails_helper"

RSpec.describe "GET /api/v1/examples" do
	it "returns a simple sentence of 'hello from rspec'" do

		get "/api/v1/examples" 

		expect(response.body).to eq('hello from rspec')

	end 
end