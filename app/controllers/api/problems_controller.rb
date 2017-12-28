class Api::ProblemsController < ApplicationController
  def index
  	problems = Problem.select(:id, :name, :description)
		if problems.present?
			render json: { problems: problems }
		else
			render json: { error: problems.errors }, status: 400
		end
  end

  def create
  	Problem.create(problem_params)
  end

  def show
  	problem = Problem.find(params[:id])
  	unless problem.nil?
			render json: { problem: problem }
		else
			render json: { error: problem.errors }, status: 400
		end

  end

  private
  def problem_params
  	params.required(:problem).permit(:name, :description, :explanation)
  end
end
