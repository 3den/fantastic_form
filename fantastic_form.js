// FantasticForm Constructor
var FantasticForm = function(selector) {
  this.selector = selector;
  this.validators = FantasticForm.validators;
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

(function($){
  FantasticForm.prototype.setInvalid = function(e, $el) {
    $el.addClass("error");
    e.isDefaultPrevented() || e.preventDefault();
  };

  FantasticForm.prototype.setValid = function($el) {
    $el.removeClass("error");
  };

  // Binds the validation callback
  FantasticForm.prototype.validate = function(onEvent) {
    var that = this;
    onEvent = onEvent || "submit"

    $("body").on(onEvent, this.selector, function(e){
      var $form = $(e.target);
      $.each(that.validators, function(key, callback) {
        $("[validate*="+ key +"]").each(function(){
          var $el = $(this);
          try {
            callback($el);
            that.setValid($el);
          } catch (err) {
            that.setInvalid(e, $el);
          }
        });
      });
    });
  };

  $.fn.fantasticForm = {}
  $.fn.fantasticForm.validate = function(options){
    var form = new FantasticForm(this);
    form.validate(options);

    return this;
  };
})(jQuery);
