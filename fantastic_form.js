// FantasticForm Constructor
var FantasticForm = function(selector, options) {
  var $ = jQuery
    , $el = $(selector)
    , that = this
    , validators = FantasticForm.validators
    , setInvalid = FantasticForm.setInvalid
    , setValid = FantasticForm.setValid;

  function check(e, $field, callback) {
    try {
      callback($field);
      setValid($field);
    } catch (err) {
      setInvalid(err, e, $field);
    }
  };

  /**
   * Validate On Change
   * Binds the field validations on change events
   *
   * returns nothing.
   **/
  this.validateOnChange = function() {
    $(selector).on("change", "[validate]", function(e){
      var $field = $(e.target)
        , fieldValidators = $field.attr('validate').match(/\w+/g);

      $.each(fieldValidators, function(i, key){
        if(validators[key]) check(e, $field, validators[key]);
      });
    });
  };

  /**
   * Validate On Submit
   * Binds the form validation on submit events
   *
   * returns nothing.
   **/
  this.validateOnSubmit = function() {
    $("body").on("submit", selector, function(e){
      var $form = $(e.target);

      $.each(validators, function(key, callback) {
        $form.find("[validate*="+ key +"]").each(function(){
          var $field = $(this);
          check(e, $field, callback);
        });
      });
    });
  };

  /**
   * Validate
   * Binds the validation events
   *
   * returns nothing.
   **/
  this.validate = function() {
    this.validateOnSubmit();
  };
};

// The fantastic validatos
FantasticForm.validators = {
  presence: function($field) {
    var value = $field.val();
    if(value == "") {
      throw $field.attr("invalid-message") || "Cannot be blank";
    }
  }
};

FantasticForm.setInvalid = function(err, e, $el) {
  $el.addClass("error");
  e.isDefaultPrevented() || e.preventDefault();
};

FantasticForm.setValid = function($el) {
  $el.removeClass("error");
};

(function($){
  $.fn.validateOnChange = function(options){
    var form = new FantasticForm(this);
    form.validateOnChange(options);

    return this;
  };
  $.fn.fantasticForm.validate = function(options){
    var form = new FantasticForm(this);
    form.validate(options);

    return this;
  };
})(jQuery);
