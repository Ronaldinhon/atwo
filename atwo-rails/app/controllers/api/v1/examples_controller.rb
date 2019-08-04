class Api::V1::ExamplesController < ApiController

	def index
		ExampleJob.perform_later(1)
		render json: 'hello from rspec'
	end
	
end