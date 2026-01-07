# frozen_string_literal: true

# Datetime Validator
class DatetimeValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.blank?

    begin
      DateTime.parse(value.to_s)
    rescue
      attr_str = attribute.to_s
      attribute = attr_str.sub("_before_type_cast", "").to_sym if attr_str.include?("_before_type_cast")
      record.errors.add(options[:attribute] || attribute, options[:message] || I18n.t("validations.message.model.datetime.invalid"))
    end
  end
end
